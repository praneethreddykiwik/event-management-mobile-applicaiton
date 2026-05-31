import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import { mapTaskForUI } from "../../../../helpers/Dashboard.helper";
import { ROUTES } from "../../../../navigation/routes";
import { eventsSelector } from "../../../../redux/events/events.slice";
import { fetchTasksApiAction } from "../../../../redux/tasks/tasks.actions";
import { tasksSelector } from "../../../../redux/tasks/tasks.slice";
import TaskItem from "../../../Tasks/components/TaskItem";

export const TasksList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { tasksByEvent } = useSelector(tasksSelector);
  const { eventDetails: event } = useSelector(eventsSelector);

  const refetchTasksByEvent = () => {
    if (!event?.uid) return;
    dispatch(
      fetchTasksApiAction({
        query: `eventUid=${event.uid}`,
        eventUid: event.uid,
      }),
    );
  };

  const createTaskHandler = () => {
    navigation.navigate(ROUTES.createTask, {
      eventUid: event.uid,
      mode: "add",
    });
  };

  const onEdit = (task) => {
    navigation.navigate(ROUTES.createTask, {
      eventUid: event.uid,
      taskUid: task.taskUid,
      mode: "edit",
      taskData: {
        title: task.taskTitle,
        description: task.taskDescription,
        priority: task.priority,
        dueAt: task.taskDueAt,
        assignedToUid: task.taskAssignedToUid,
      },
    });
  };

  return (
    <Wrap>
      <Head>
        <Heading>List of Tasks</Heading>
        <CreateBtn onPress={createTaskHandler} activeOpacity={0.85}>
          <CreateBtnText>+ Create Task</CreateBtnText>
        </CreateBtn>
      </Head>

      {tasksByEvent.length === 0 ? (
        <EmptyText>No tasks added yet.</EmptyText>
      ) : (
        <List>
          {tasksByEvent.map((task) => (
            <TaskItem
              key={task.taskUid}
              task={mapTaskForUI(task, event)}
              onEdit={onEdit}
              onAfterDelete={refetchTasksByEvent}
            />
          ))}
        </List>
      )}
    </Wrap>
  );
};

const Wrap = styled.View`
  padding-top: 8px;
`;

const Head = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
`;

const Heading = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const CreateBtn = styled.TouchableOpacity`
  padding: 8px 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;

const CreateBtnText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
`;

const List = styled.View`
  gap: 12px;
`;

const EmptyText = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  text-align: center;
  padding: 20px 0;
`;
