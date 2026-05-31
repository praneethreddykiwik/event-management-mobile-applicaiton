import { StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../components/Buttons/Button";
import { Inputs } from "../../components/Inputs/Inputs";
import { validationList } from "../../constants/validations.constants";
import {
  formsSelector,
  updateAllTaskInputs,
} from "../../redux/forms/forms.slice";
import { generateUserOptions } from "../../redux/forms/metadata/task.metadata";
import { usersSelector } from "../../redux/users/users.slice";

const CONTINUE = "Continue";

const TaskForm = ({ onCreateTask }) => {
  const dispatch = useDispatch();
  const { createTaskInputs } = useSelector(formsSelector);
  const { vendors, supervisors } = useSelector(usersSelector);

  const validateFields = () => {
    let isValid = true;
    const newInputs = createTaskInputs.map((el) => {
      const isReq = el.validations?.includes(validationList.REQUIRED);
      if (isReq && !el.value) {
        isValid = false;
        return { ...el, error: "This field is required" };
      }
      return { ...el, error: "" };
    });
    dispatch(updateAllTaskInputs(newInputs));
    return isValid;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = createTaskInputs.map((el) => {
      const inp = { ...el };

      if (name === "assineeType" && inp.name === "assignedToUid") {
        const isSupervisorSelected = value === "Assign to Supervisor";
        inp.options = generateUserOptions(
          isSupervisorSelected ? supervisors : vendors,
        );
        inp.label = isSupervisorSelected
          ? "Assign to Supervisor"
          : "Assign to Vendor";
        inp.value = "";
      }

      if (inp.name === name) {
        return { ...inp, value, error: null };
      }
      return inp;
    });

    dispatch(updateAllTaskInputs(next));
  };

  const onSubmit = async () => {
    if (!validateFields()) return;

    const reqPayload = createTaskInputs.reduce(
      (acc, cur) => ({ ...acc, [cur.name]: cur.value }),
      {},
    );

    await onCreateTask({ reqPayload });
  };

  return (
    <Animated.View layout={LinearTransition.duration(220)}>
      {createTaskInputs.map((inp) => (
        <Inputs key={inp.name} {...inp} onChange={onChange} />
      ))}

      <View style={styles.submitRow}>
        <Button onClick={onSubmit} whiteText>
          {CONTINUE}
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  submitRow: {
    marginTop: 8,
  },
});

export default TaskForm;
