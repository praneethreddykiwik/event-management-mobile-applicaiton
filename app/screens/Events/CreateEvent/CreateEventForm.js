import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import {
  formsSelector,
  updateEventInputs,
  updateAllEventInputs,
} from "../../../redux/forms/forms.slice";
import { Inputs } from "../../../components/Inputs/Inputs";
import { Button } from "../../../components/Buttons/Button";
import { authSelector } from "../../../redux/auth/auth.slice";
import { modifyTimeToISO } from "../../../utils/utils";
import { generateNewEventsInputs } from "../../../redux/forms/metadata/event.metadata";
import { userSelecter } from "../../../redux/users/users.slice";
import { validationList } from "../../../constants/validations.constants";

const CONTINUE = "Continue";

const CreateEventForm = ({ onCreateEvent, navigation }) => {
  const dispatch = useDispatch();

  const { createEventInputs } = useSelector(formsSelector);
  const { tenantId } = useSelector(authSelector);
  const { eventManagers } = useSelector(userSelecter);

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
    dispatch(updateEventInputs({ name, value }));
  };

  const onSubmit = async () => {
    const isValid = validateFields();
    if (!isValid) return;

    const reqPayload = createEventInputs.reduce((acu, cur) => {
      return { ...acu, [cur.name]: cur.value };
    }, {});

    const scheduledAt = modifyTimeToISO(
      reqPayload.eventDate,
      reqPayload.eventTime,
    );
    reqPayload.tenantUid = tenantId;
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
    <View>
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
    </View>
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
