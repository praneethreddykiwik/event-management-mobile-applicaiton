import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import PageHeader from "../../../components/Headers/PageHeader/PageHeader";
import { ScreenWrapper } from "../../../HOC/ScreenWrapper";
import ScrollView from "../../../layouts/scrollview/ScrollView.layout";
import { ROUTES } from "../../../navigation/routes";
import { fetchEventDetailsAction } from "../../../redux/events/events.action";
import { eventsSelector } from "../../../redux/events/events.slice";
import { fetchTasksApiAction } from "../../../redux/tasks/tasks.actions";
import { tasksSelector } from "../../../redux/tasks/tasks.slice";
import { CardsBox } from "./components/CardsBox";
import { DetailsBox } from "./components/DetailsBox";
import { TaskProgress } from "./components/TaskProgress";
import { TasksList } from "./components/TasksList";
import { TitleBox } from "./components/TitleBox";

const EventDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    eventDetails: event,
    eventDetailsLoading,
    eventDetailsUid,
  } = useSelector(eventsSelector);
  const { tasksByEventUid } = useSelector(tasksSelector);

  const eventUid = route?.params?.eventUid;

  useEffect(() => {
    if (!eventUid) {
      navigation.navigate(ROUTES.eventsDashboard);
      return;
    }
    if (eventDetailsUid !== eventUid) {
      dispatch(fetchEventDetailsAction({ eventUid }));
    }
    if (tasksByEventUid !== eventUid) {
      dispatch(
        fetchTasksApiAction({ query: `eventUid=${eventUid}`, eventUid }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventUid]);

  const showSkeleton = eventDetailsLoading && !event?.uid;

  return (
    <ScreenWrapper>
      <PageHeader title>Event Details</PageHeader>

      <ScrollView showsVerticalScrollIndicator={false}>
        {showSkeleton ? (
          <LoaderWrap>
            <ActivityIndicator />
            <LoaderText>Loading event…</LoaderText>
          </LoaderWrap>
        ) : (
          <Container>
            <TitleBox />

            <Body>
              <DetailsBox />
              <CardsBox />
              <TaskProgress />
            </Body>

            <TasksList />
          </Container>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const Container = styled.View`
  padding: 8px 4px 24px;
  gap: 20px;
`;

const Body = styled.View`
  gap: 12px;
`;

const LoaderWrap = styled.View`
  padding: 40px 0;
  align-items: center;
  gap: 8px;
`;

const LoaderText = styled.Text`
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
`;

export default EventDetails;