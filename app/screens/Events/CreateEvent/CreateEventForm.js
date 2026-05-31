import { StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../../components/Buttons/Button";
import { Inputs } from "../../../components/Inputs/Inputs";
import { validationList } from "../../../constants/validations.constants";
import { authSelector } from "../../../redux/auth/auth.slice";
import {
  formsSelector,
  updateAllEventInputs,
  updateEventInputs,
} from "../../../redux/forms/forms.slice";
import { generateNewEventsInputs } from "../../../redux/forms/metadata/event.metadata";
import { usersSelector } from "../../../redux/users/users.slice";
import logger from "../../../utils/logger.utils";
import { modifyTimeToISO } from "../../../utils/utils";

const CONTINUE = "Continue";

const CreateEventForm = ({ onCreateEvent, navigation }) => {
  const dispatch = useDispatch();

  const { createEventInputs } = useSelector(formsSelector);
  const { authUser } = useSelector(authSelector);
  const { eventManagers } = useSelector(usersSelector);

  const tenantUid = authUser?.tenantUid;

  const validateFields = () => {
    let isValid = true;
    const newInputs = createEventInputs.map((el) => {
      const isReq = el.validations?.includes(validationList.REQUIRED);
      if (isReq && !el.value) {
        isValid = false;
        return { ...el, error: "This field is required" };
      }
      return { ...el, error: "" };
    });
    dispatch(updateAllEventInputs(newInputs));
    return isValid;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    logger.info("This is a Debug log 2", { name, value });
    dispatch(updateEventInputs({ name, value }));
  };

  const onSubmit = async () => {
    const isValid = validateFields();
    if (!isValid) {
      return;
    }

    const reqPayload = createEventInputs.reduce((acu, cur) => {
      return { ...acu, [cur.name]: cur.value };
    }, {});

    const scheduledAt = modifyTimeToISO(
      reqPayload.eventDate,
      reqPayload.eventTime,
    );
    reqPayload.tenantUid = tenantUid;
    reqPayload.scheduledAt = scheduledAt;
    reqPayload.status = "pending";
    await onCreateEvent({ navigation, reqPayload });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const clearHandler = () => {
    const eventMetaDataFull = generateNewEventsInputs(eventManagers);
    dispatch(updateAllEventInputs(eventMetaDataFull));
  };

  return (
    <Animated.View layout={LinearTransition.duration(250)}>
      {createEventInputs.map((inp) => (
        <Inputs key={inp.name} {...inp} onChange={onChange} />
      ))}

      <View style={styles.buttonRow}>
        <View style={styles.buttonFlex}>
          <Button type="secondary" onClick={clearHandler}>
            Clear
          </Button>
        </View>
        <View style={styles.buttonFlex}>
          <Button onClick={onSubmit}>{CONTINUE}</Button>
        </View>
      </View>

      <View style={styles.goBackRow}>
        <Button type="outlined" onClick={goBack}>
          Go Back
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  buttonFlex: {
    flex: 1,
  },
  goBackRow: {
    marginTop: 16,
  },
});

export default CreateEventForm;
