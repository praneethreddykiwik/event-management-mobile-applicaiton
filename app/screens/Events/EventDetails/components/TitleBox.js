import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import { Icon } from "../../../../components/Icons/Icons";
import { ROUTES } from "../../../../navigation/routes";
import { authSelector } from "../../../../redux/auth/auth.slice";
import {
  deleteEventAction,
  fetchEventsAction,
} from "../../../../redux/events/events.action";
import { eventsSelector } from "../../../../redux/events/events.slice";
import {
  formsSelector,
  updateAllEventInputs,
} from "../../../../redux/forms/forms.slice";
import { generateEventDataToEdit } from "../../../../redux/forms/metadata/event.metadata";
import { fetchManagersAction } from "../../../../redux/users/users.actions";
import { usersSelector } from "../../../../redux/users/users.slice";

export const TitleBox = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { eventDetails: event } = useSelector(eventsSelector);
  const { eventManagers } = useSelector(usersSelector);
  const { authUser } = useSelector(authSelector);

  const goToEdit = (managers) => {
    const inputs = generateEventDataToEdit(managers, event);
    dispatch(updateAllEventInputs(inputs));
    navigation.navigate(ROUTES.editEvent, {
      mode: "edit",
      eventUid: event.uid,
    });
  };

  const onClickEdit = () => {
    if (!eventManagers.length) {
      dispatch(fetchManagersAction({ callback: goToEdit }));
    } else {
      goToEdit(eventManagers);
    }
  };

  const onClickDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await dispatch(
            deleteEventAction({
              eventUid: event.uid,
              tenantUid: event.tenantUid,
              deletedByUid: authUser?.uid,
              deleteReason: "",
            }),
          );
          // Refresh dashboard list so the deleted event is gone when we go back.
          dispatch(fetchEventsAction({ query: "" }));
          navigation.navigate(ROUTES.eventsDashboard);
        },
      },
    ]);
  };

  return (
    <Wrap>
      <TitleCol>
        <EventName numberOfLines={2}>{event.eventName}</EventName>
        <BadgeRow>
          <TypeBadge type={event.type}>
            <TypeBadgeText type={event.type}>
              {event.eventType || "—"}
            </TypeBadgeText>
          </TypeBadge>
        </BadgeRow>
      </TitleCol>

      <Buttons>
        <EditBtn onPress={onClickEdit} activeOpacity={0.85}>
          <Icon variant="edit" size={16} />
          <EditBtnText>Edit Event</EditBtnText>
        </EditBtn>
        <DeleteBtn onPress={onClickDelete} activeOpacity={0.85}>
          <Icon variant="delete" size={16} color="#fff" />
          <DeleteBtnText>Delete Event</DeleteBtnText>
        </DeleteBtn>
      </Buttons>
    </Wrap>
  );
};

const Wrap = styled.View`
  gap: 14px;
`;

const TitleCol = styled.View`
  gap: 8px;
`;

const EventName = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const BadgeRow = styled.View`
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

const TypeBadge = styled.View`
  padding: 4px 10px;
  border-radius: 8px;
  border-width: 1px;
  background-color: ${({ theme, type }) =>
    theme.badgeColors[`badge-${type}-transparent`] || "rgba(0,0,0,0.08)"};
  border-color: ${({ theme, type }) =>
    theme.badgeColors[`badge-${type}-primary`] || theme.colors.black};
`;

const TypeBadgeText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption["font-size"]}px;
  font-weight: 700;
  color: ${({ theme, type }) =>
    theme.badgeColors[`badge-${type}-primary`] || theme.colors.black};
`;

const Buttons = styled.View`
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const EditBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors["gray-light"]};
  background-color: ${({ theme }) => theme.colors.white};
`;

const EditBtnText = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const DeleteBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.warning};
`;

const DeleteBtnText = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`;
