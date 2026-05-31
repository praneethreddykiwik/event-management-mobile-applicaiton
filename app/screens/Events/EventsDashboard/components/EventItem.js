import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import { authSelector } from "../../../../redux/auth/auth.slice";
import {
  assignEventAction,
  deleteEventAction,
  fetchEventsAction,
} from "../../../../redux/events/events.action";
import { eventsSelector } from "../../../../redux/events/events.slice";
import logger from "../../../../utils/logger.utils";
import { formatDateTime } from "../../../../utils/utils";

const EventItem = ({ event, onViewDetails }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(authSelector);
  const { selectedEventFilters } = useSelector(eventsSelector);

  // logger.info("event here map: ", event);

  const isAssignedToMe = event.assignedToUid === authUser?.uid;
  // Compare here/.
  const onAssignToMe = () => {
    const reqPayload = {
      eventUid: event.uid,
      assignedToUid: authUser?.uid,
      userName: authUser?.username,
      tenantUid: authUser?.tenantUid, // this value should go from BE session not FE. // check here
      updatedByUid: authUser?.uid, // this value should go from BE session not FE. // check here
    };

    logger.info("reqpayload item: ", reqPayload);

    dispatch(
      assignEventAction({
        reqPayload,
      }),
    );
  };

  const handleDeleteAction = async () => {
    const reqPayload = {
      eventUid: event.uid,
      tenantUid: event.tenantUid,
      deletedByUid: authUser?.uid,
      deleteReason: "",
    };

    await dispatch(deleteEventAction(reqPayload));

    const query = selectedEventFilters
      .filter((f) => f.selected)
      .map((f) => f.value)
      .join(",");
    dispatch(fetchEventsAction({ query: `?status=${query}` }));
  };

  const onDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: handleDeleteAction,
      },
    ]);
  };

  return (
    <Card>
      <Header>
        <Info>
          <EventName>{event.eventName}</EventName>
          <Meta>Scheduled At: {formatDateTime(event.scheduledAt)}</Meta>
          <Meta>
            <Bold>Venue:</Bold>{" "}
            {event.venue
              ? event.venue.charAt(0).toUpperCase() + event.venue.slice(1)
              : "—"}
          </Meta>
          <Meta>
            <Bold>Event Manager:</Bold> {event.userName || "Unassigned"}
          </Meta>
        </Info>

        <StatusBadge type={event.type}>
          <StatusBadgeText type={event.type}>
            {event.statusLabel}
          </StatusBadgeText>
        </StatusBadge>
      </Header>

      <Actions>
        {isAssignedToMe ? (
          <AssignedLabel>Assigned To Me</AssignedLabel>
        ) : (
          // refactor this later // check here important
          <AssignBtn onPress={onAssignToMe}>
            <AssignBtnText>Assign to Me</AssignBtnText>
          </AssignBtn>
        )}

        <RightActions>
          <DeleteBtn onPress={onDelete}>
            <DeleteBtnText>Delete</DeleteBtnText>
          </DeleteBtn>
          <ViewBtn onPress={onViewDetails}>
            <ViewBtnText>View Details</ViewBtnText>
          </ViewBtn>
        </RightActions>
      </Actions>
    </Card>
  );
};

const Card = styled.View.attrs(({ theme }) => ({
  style: theme?.shadows?.["level-3"] || {},
}))`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 12px;
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

const EventName = styled.Text`
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

const AssignedLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
`;

const AssignBtn = styled.TouchableOpacity`
  padding: 7px 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;

const AssignBtnText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
`;

const RightActions = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
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

const ViewBtn = styled.TouchableOpacity`
  padding: 7px 14px;
  border-radius: 8px;
  background-color: #f3f4f6;
`;

const ViewBtnText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
`;

export default EventItem;
