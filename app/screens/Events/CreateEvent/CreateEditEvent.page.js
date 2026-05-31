/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import PageHeader from "../../../components/Headers/PageHeader/PageHeader";
import { VenueSuggestion } from "../../../components/Venue/VenueSuggestion";
import { eventsMetadata } from "../../../constants/events.constants";
import { ScreenWrapper } from "../../../HOC/ScreenWrapper";
import ScrollView from "../../../layouts/scrollview/ScrollView.layout";
import {
  createEventAction,
  updateEventAction,
} from "../../../redux/events/events.action";
import {
  formsSelector,
  updateAllEventInputs,
} from "../../../redux/forms/forms.slice";
import { generateNewEventsInputs } from "../../../redux/forms/metadata/event.metadata";
import { fetchManagersAction } from "../../../redux/users/users.actions";
import { usersSelector } from "../../../redux/users/users.slice";
import logger from "../../../utils/logger.utils";
import CreateEventForm from "./CreateEventForm";

const CreateEditEvent = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { eventManagers, eventManagersLoaded } = useSelector(usersSelector);
  const { createEventInputs } = useSelector(formsSelector);

  const isEditMode = route?.params?.mode === "edit";

  useEffect(() => {
    if (!isEditMode) {
      refreshOnCreateMode();
    }
  }, []);

  const refreshOnCreateMode = () => {
    if (eventManagersLoaded) {
      const inputs = generateNewEventsInputs(eventManagers);
      dispatch(updateAllEventInputs(inputs));
    } else {
      const callback = (eventManagersRes) => {
        const inputs = generateNewEventsInputs(eventManagersRes);

        dispatch(updateAllEventInputs(inputs));
      };
      dispatch(fetchManagersAction({ callback }));
    }
  };

  const onCreateEvent = (payload) => {
    logger.info("isEditMode: ", isEditMode);
    if (isEditMode) {
      dispatch(updateEventAction(payload));
    } else {
      Toast.show({ type: "success", text1: "Event created successfully" });
      dispatch(createEventAction(payload));
    }
  };

  const onChooseVenueSuggestion = (event) => {
    const k = createEventInputs.map((inp) => {
      return { ...inp, value: event[inp.name] || inp.value };
    });
    dispatch(updateAllEventInputs(k));
    Toast.show({
      type: "success",
      text1: "Selected event details are added in the input fields",
    });
  };

  return (
    <ScreenWrapper>
      <PageHeader title>
        {isEditMode ? "Edit Event" : "Create Event"}
      </PageHeader>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Form */}
        <FormContainer>
          <CreateEventForm
            onCreateEvent={onCreateEvent}
            navigation={navigation}
          />
        </FormContainer>

        {/* Venue Suggestions */}
        <SuggestionsSection>
          <SectionHeading>
            Please choose from one of the below Events
          </SectionHeading>
          {eventsMetadata.map((el) => (
            <VenueSuggestion
              key={el.title}
              venueDetails={el}
              btnText="Choose"
              onClick={() => onChooseVenueSuggestion(el)}
            />
          ))}
        </SuggestionsSection>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    // paddingTop: 20,
    paddingBottom: 40,
  },
});

const HeaderTitle = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #000;
`;

const FormContainer = styled.View``;

const SuggestionsSection = styled.View`
  margin-top: 20px;
`;

const SectionHeading = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
`;

export default CreateEditEvent;
