import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import { Button } from "../../components/Buttons/Button";
import PageHeader from "../../components/Headers/PageHeader/PageHeader";
import { tasksMetadata } from "../../constants/tasks.constants";
import { ScreenWrapper } from "../../HOC/ScreenWrapper";
import ScrollView from "../../layouts/scrollview/ScrollView.layout";
import { authSelector } from "../../redux/auth/auth.slice";
import {
  formsSelector,
  updateAllTaskInputs,
} from "../../redux/forms/forms.slice";
import {
  generateAddTaskInpMetadata,
  generateTaskDataToEdit,
} from "../../redux/forms/metadata/task.metadata";
import {
  createTaskAction,
  editTaskAction,
  fetchEventsAndTasksAction,
} from "../../redux/tasks/tasks.actions";
import { fetchVendorsSupsQA } from "../../redux/users/users.actions";
import { usersSelector } from "../../redux/users/users.slice";
import TaskForm from "./TaskForm";

const CreateTask = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { authUser } = useSelector(authSelector);
  const { vendors, supervisors, qa, vendorsSupsQALoaded } =
    useSelector(usersSelector);
  const { createTaskInputs } = useSelector(formsSelector);

  const mode = route?.params?.mode || "add";
  const eventUid = route?.params?.eventUid;
  const taskUid = route?.params?.taskUid;
  const taskData = route?.params?.taskData;
  const isEditMode = mode === "edit";

  useEffect(() => {
    const setupForm = (data) => {
      const { supervisors: sups, vendors: vens, qa: qaList } = data;

      const vendorsOrSuprvs = authUser?.role === "supervisors" ? sups : vens;

      if (isEditMode) {
        dispatch(
          updateAllTaskInputs(
            generateTaskDataToEdit(vendorsOrSuprvs, qaList, taskData || {}),
          ),
        );
      } else {
        dispatch(
          updateAllTaskInputs(
            generateAddTaskInpMetadata(vendorsOrSuprvs, qaList),
          ),
        );
      }
    };

    if (vendorsSupsQALoaded) {
      setupForm({ supervisors, vendors, qa });
    } else {
      dispatch(fetchVendorsSupsQA({ callback: setupForm }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetchTasksList = () => {
    const query = `assignedToUid=${authUser?.uid}&tenantUid=${authUser?.tenantUid}`;
    dispatch(fetchEventsAndTasksAction(query));
  };

  const onSubmit = ({ reqPayload }) => {
    if (!eventUid) {
      Toast.show({
        type: "error",
        text1: "Missing event — please go back and try again",
      });
      return;
    }

    const fullPayload = {
      ...reqPayload,
      tenantUid: authUser?.tenantUid,
      eventUid,
    };

    if (isEditMode) {
      fullPayload.taskUid = taskUid;
      dispatch(
        editTaskAction({
          reqPayload: fullPayload,
          navigation,
          onSuccess: refetchTasksList,
        }),
      );
    } else {
      dispatch(
        createTaskAction({
          reqPayload: fullPayload,
          navigation,
          onSuccess: refetchTasksList,
        }),
      );
    }
  };

  const onClickSuggestion = (selectedTask) => {
    const next = createTaskInputs.map((inp) => ({
      ...inp,
      value: selectedTask[inp.name] ?? inp.value,
    }));
    dispatch(updateAllTaskInputs(next));
    Toast.show({
      type: "success",
      text1: "Selected task details are added in the input fields",
    });
  };

  const goBack = () => navigation.goBack();

  return (
    <ScreenWrapper>
      <PageHeader title>{isEditMode ? "Edit Task" : "Create Task"}</PageHeader>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FormBlock>
          <TaskForm onCreateTask={onSubmit} />
          <GoBackRow>
            <Button type="outlined" onClick={goBack}>
              Go Back
            </Button>
          </GoBackRow>
        </FormBlock>

        <SuggestionsHeading>
          Or pick a task suggestion to prefill
        </SuggestionsHeading>

        <View>
          {tasksMetadata.map((t) => (
            <SuggestionCard key={t.title}>
              <SuggestionTitle numberOfLines={1}>{t.title}</SuggestionTitle>
              <SuggestionDesc numberOfLines={2}>{t.description}</SuggestionDesc>
              <SuggestionMeta>Priority: {t.priority}</SuggestionMeta>
              <SuggestionAction>
                <Button onClick={() => onClickSuggestion(t)} small>
                  Choose
                </Button>
              </SuggestionAction>
            </SuggestionCard>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});

const FormBlock = styled.View`
  padding: 8px 4px 0;
`;

const GoBackRow = styled.View`
  margin-top: 12px;
`;

const SuggestionsHeading = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin: 24px 6px 12px;
`;

const SuggestionCard = styled.View.attrs(({ theme }) => ({
  style: theme?.shadows?.["level-3"] || {},
}))`
  background-color: #fff;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 10px;
  border: ${({ theme }) => theme.borders["border-gray"]};
  gap: 4px;
`;

const SuggestionTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #000;
`;

const SuggestionDesc = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
`;

const SuggestionMeta = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  margin-top: 2px;
`;

const SuggestionAction = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 8px;
`;

export default CreateTask;
