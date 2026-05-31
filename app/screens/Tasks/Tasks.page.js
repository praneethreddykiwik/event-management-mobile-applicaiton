import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import PageHeader from "../../components/Headers/PageHeader/PageHeader";
import { StyledParagraphSmallGray } from "../../components/Styled/Typography.styled";
import { mapTaskForUI } from "../../helpers/Dashboard.helper";
import { ScreenWrapper } from "../../HOC/ScreenWrapper";
import ScrollView from "../../layouts/scrollview/ScrollView.layout";
import { authSelector } from "../../redux/auth/auth.slice";
import { fetchEventsAndTasksAction } from "../../redux/tasks/tasks.actions";
import { tasksSelector } from "../../redux/tasks/tasks.slice";
import { fetchVendorsSupsQA } from "../../redux/users/users.actions";
import { usersSelector } from "../../redux/users/users.slice";
import { getStatusColor } from "../../utils/utils";
import { EventSection } from "./components/EventSection";
import FilterCard from "./components/FilterCard";
import TaskItem from "./components/TaskItem";

const Tasks = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { authUser } = useSelector(authSelector);
  const { tasks, taskCountObj, tasksLoaded, tasksLoading } =
    useSelector(tasksSelector);
  const { vendorsSupsQALoaded } = useSelector(usersSelector);

  useEffect(() => {
    if (!tasksLoaded && !tasksLoading) {
      const query = `assignedToUid=${authUser?.uid}&tenantUid=${authUser?.tenantUid}`;
      dispatch(fetchEventsAndTasksAction(query));
    }

    if (!vendorsSupsQALoaded) {
      dispatch(fetchVendorsSupsQA());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddTask = (event) => {
    navigation.navigate("CreateTask", {
      eventUid: event.eventUid,
      mode: "add",
    });
  };

  const onEdit = (task, event) => {
    navigation.navigate("CreateTask", {
      eventUid: event.eventUid,
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
    <ScreenWrapper>
      <PageHeader title>Tasks</PageHeader>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Filter cards */}
        <CardsRow>
          {Object.keys(taskCountObj).map((key) => (
            <FilterCard
              key={key}
              objKey={key}
              value={taskCountObj[key]}
              color={getStatusColor(key, taskCountObj)}
            />
          ))}
        </CardsRow>

        {tasks.length === 0 ? (
          <EmptyText>No events available</EmptyText>
        ) : (
          tasks.map((event) => (
            <EventSection
              key={event.eventUid}
              event={event}
              onAddTask={onAddTask}
            >
              {event.tasks?.length ? (
                event.tasks.map((task) => (
                  <TaskItem
                    key={task.taskUid}
                    task={mapTaskForUI(task, event)}
                    onEdit={(tsk) => onEdit(tsk, event)}
                  />
                ))
              ) : (
                <StyledParagraphSmallGray>
                  No tasks added yet
                </StyledParagraphSmallGray>
              )}
            </EventSection>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const CardsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  padding: 30px 20px;
`;

export default Tasks;
