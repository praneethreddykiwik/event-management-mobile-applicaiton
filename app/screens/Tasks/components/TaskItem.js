import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import { authSelector } from "../../../redux/auth/auth.slice";
import {
  deleteTaskAction,
  fetchEventsAndTasksAction,
} from "../../../redux/tasks/tasks.actions";
import { formatDateTime } from "../../../utils/utils";
import ManageTaskModal from "./ManageTaskModal";

const TaskItem = ({ task = {}, onEdit, onAfterDelete }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(authSelector);

  const [showManageEvent, setShowManageEvent] = useState(false);

  const onOpen = () => setShowManageEvent(true);

  const onDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          // Parents can override the post-delete refetch (e.g. EventDetails
          // refetches the per-event list, Tasks dashboard refetches all).
          const callBack =
            onAfterDelete ||
            (() => {
              const query = `assignedToUid=${authUser?.uid}&tenantUid=${authUser?.tenantUid}`;
              dispatch(fetchEventsAndTasksAction(query));
            });
          dispatch(
            deleteTaskAction({
              callBack,
              reqPayload: {
                taskUid: task.taskUid,
                tenantUid: authUser?.tenantUid,
              },
            }),
          );
        },
      },
    ]);
  };

  return (
    <Card>
      <Header>
        <Info>
          <TaskTitle numberOfLines={2}>{task.taskTitle}</TaskTitle>
          {!!task.taskDescription && (
            <Meta numberOfLines={2}>
              <Bold>Desc: </Bold>
              {task.taskDescription}
            </Meta>
          )}
          <Meta>
            <Bold>Assigned To: </Bold>
            {task.taskAssignedTo || "—"}
          </Meta>
          <Meta>
            <Bold>Due: </Bold>
            {formatDateTime(task.taskDueAt) || "—"}
          </Meta>
          <Meta>
            <Bold>Created At: </Bold>
            {formatDateTime(task.taskCreatedAt) || "—"}
          </Meta>

          <QaRow>
            <Meta>
              <Bold>QA: </Bold>
              {task.qaAssigned || "—"}
            </Meta>
            <QaBadge approved={task.isQaApproved}>
              <QaBadgeText approved={task.isQaApproved}>
                {task.isQaApproved ? "QA Approved" : "QA Not Approved"}
              </QaBadgeText>
            </QaBadge>
          </QaRow>
        </Info>

        <StatusBadge type={task.type}>
          <StatusBadgeText type={task.type}>{task.taskStatus}</StatusBadgeText>
        </StatusBadge>
      </Header>

      <Actions>
        <DetailsBtn onPress={onOpen} activeOpacity={0.85}>
          <DetailsBtnText>Details</DetailsBtnText>
        </DetailsBtn>

        <RightActions>
          <DeleteBtn onPress={onDelete} activeOpacity={0.85}>
            <DeleteBtnText>Delete</DeleteBtnText>
          </DeleteBtn>
          <EditBtn onPress={() => onEdit(task)} activeOpacity={0.85}>
            <EditBtnText>Edit</EditBtnText>
          </EditBtn>
        </RightActions>
      </Actions>

      {showManageEvent && (
        <ManageTaskModal task={task} onClose={() => setShowManageEvent(false)} />
      )}
    </Card>
  );
};

const Card = styled.View.attrs(({ theme }) => ({
  style: theme?.shadows?.["level-3"] || {},
}))`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 16px;
  border: ${({ theme }) => theme.borders["border-gray"]};
`;

const Header = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
`;

const Info = styled.View`
  flex: 1;
  gap: 3px;
`;

const TaskTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography["heading-h3"]["font-size"]}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 6px;
`;

const Meta = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  margin-top: 2px;
`;

const Bold = styled.Text`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const QaRow = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`;

const QaBadge = styled.View`
  padding: 2px 8px;
  border-radius: 8px;
  background-color: ${({ approved }) =>
    approved ? "rgba(38, 200, 103, 0.231)" : "rgba(242, 34, 34, 0.18)"};
`;

const QaBadgeText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption["font-size"]}px;
  font-weight: 700;
  color: ${({ approved }) => (approved ? "#0cc657" : "#d83232")};
`;

const StatusBadge = styled.View`
  padding: 4px 10px;
  border-radius: 8px;
  border-width: 1px;
  align-self: flex-start;
  background-color: ${({ theme, type }) =>
    theme.badgeColors[`badge-${type}-transparent`] || "rgba(0,0,0,0.1)"};
  border-color: ${({ theme, type }) =>
    theme.badgeColors[`badge-${type}-primary`] || theme.colors.black};
`;

const StatusBadgeText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption["font-size"]}px;
  font-weight: 700;
  color: ${({ theme, type }) =>
    theme.badgeColors[`badge-${type}-primary`] || theme.colors.black};
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 12px;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
`;

const RightActions = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const DetailsBtn = styled.TouchableOpacity`
  padding: 7px 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;

const DetailsBtnText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
`;

const DeleteBtn = styled.TouchableOpacity`
  padding: 7px 14px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.warning};
`;

const DeleteBtnText = styled.Text`
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
`;

const EditBtn = styled.TouchableOpacity`
  padding: 7px 14px;
  border-radius: 8px;
  background-color: #f3f4f6;
`;

const EditBtnText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
`;

export default TaskItem;
