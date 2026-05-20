import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

import { ScreenWrapper } from "../../../HOC/ScreenWrapper";
import {
  formsSelector,
  updateAllEventInputs,
} from "../../../redux/forms/forms.slice";
import { userSelecter } from "../../../redux/users/users.slice";
import {
  createEventAction,
  updateEventAction,
} from "../../../redux/events/events.action";
import { fetchManagersAction } from "../../../redux/users/users.actions";
import { generateNewEventsInputs } from "../../../redux/forms/metadata/event.metadata";
import { eventsMetadata } from "../../../constants/events.constants";
import { VenueSuggestion } from "../../../components/Venue/VenueSuggestion";
import Toast from "react-native-toast-message";
import CreateEventForm from "./CreateEventForm";
import PageHeader from "../../../components/Headers/PageHeader/PageHeader";
import ScrollView from "../../../layouts/scrollview/ScrollView.layout";

const CreateEditEvent = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { eventManagers } = useSelector(userSelecter);
  const { createEventInputs } = useSelector(formsSelector);

  const isEditMode = route?.params?.mode === "edit";

  useEffect(() => {
    if (!isEditMode) {
      refreshOnCreateMode();
    }
  }, []);

  const refreshOnCreateMode = () => {
    if (!eventManagers.length) {
      const callback = (eventManagersRes) => {
        const inputs = generateNewEventsInputs(eventManagersRes);
        dispatch(updateAllEventInputs(inputs));
      };
      dispatch(fetchManagersAction({ callback }));
    } else {
      const inputs = generateNewEventsInputs(eventManagers);
      dispatch(updateAllEventInputs(inputs));
    }
  };

  const onCreateEvent = (payload) => {
    if (isEditMode) {
      dispatch(updateEventAction(payload));
    } else {
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
