import { Modal, Pressable } from "react-native";
import styled from "styled-components/native";

import { Icon } from "../../../components/Icons/Icons";
import { formatDateTime } from "../../../utils/utils";

const ManageTaskModal = ({ task = {}, onClose }) => {
  return (
    <Modal
      visible
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Backdrop onPress={onClose}>
        <Card onPress={() => {}}>
          <CardHeader>
            <CardTitle numberOfLines={1}>{task.taskTitle}</CardTitle>
            <Pressable onPress={onClose} hitSlop={10}>
              <Icon variant="close" size={22} />
            </Pressable>
          </CardHeader>

          <Row>
            <Label>Status:</Label>
            <Value>{task.taskStatus}</Value>
          </Row>
          <Row>
            <Label>Description:</Label>
            <Value>{task.taskDescription || "—"}</Value>
          </Row>
          <Row>
            <Label>Assigned To:</Label>
            <Value>{task.taskAssignedTo || "—"}</Value>
          </Row>
          <Row>
            <Label>QA Assigned:</Label>
            <Value>{task.qaAssigned || "—"}</Value>
          </Row>
          <Row>
            <Label>Due:</Label>
            <Value>{formatDateTime(task.taskDueAt)}</Value>
          </Row>
          <Row>
            <Label>Created:</Label>
            <Value>{formatDateTime(task.taskCreatedAt)}</Value>
          </Row>
        </Card>
      </Backdrop>
    </Modal>
  );
};

const Backdrop = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.45);
  justify-content: center;
  padding: 20px;
`;

const Card = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 18px;
  gap: 8px;
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const CardTitle = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.typography["heading-h3"]["font-size"]}px;
  font-weight: ${({ theme }) => theme.typography["heading-h3"]["font-weight"]};
  color: ${({ theme }) => theme.colors.black};
`;

const Row = styled.View`
  flex-direction: row;
  gap: 6px;
  flex-wrap: wrap;
`;

const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  font-weight: 600;
`;

const Value = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors.black};
  flex-shrink: 1;
`;

export default ManageTaskModal;
