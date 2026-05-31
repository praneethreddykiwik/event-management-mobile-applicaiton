import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import PageHeader from "../../../components/Headers/PageHeader/PageHeader";
import { INITIAL_FILTERS } from "../../../constants/events.constants";
import { ROLES } from "../../../constants/roles";
import { MONITOR_EV } from "../../../Enums";
import { mapEventForUI } from "../../../helpers/Dashboard.helper";
import { ScreenWrapper } from "../../../HOC/ScreenWrapper";
import ScrollView from "../../../layouts/scrollview/ScrollView.layout";
import { fetchEventsAction } from "../../../redux/events/events.action";
import { eventsSelector } from "../../../redux/events/events.slice";
import { fetchManagersAction } from "../../../redux/users/users.actions";
import { usersSelector } from "../../../redux/users/users.slice";
import logger from "../../../utils/logger.utils";
import CreateEventButtons from "./components/CreateEventButtons";
import EventItem from "./components/EventItem";
import EventsFilterCards from "./components/EventsFilterCards";
import EventSummaryCards from "./components/EventSummaryCards";

// Compare here/. need full comparision and re-write.
const EventsDashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { events, eventsLoading, eventsLoaded } = useSelector(eventsSelector);
  const { eventManagers, eventManagersLoaded } = useSelector(usersSelector);

  useEffect(() => {
    if (!eventManagersLoaded) {
      dispatch(fetchManagersAction());
    }
    if (!eventsLoaded && !eventsLoading) {
      const query = `?status=${INITIAL_FILTERS.filter((fl) => fl.selected)
        .map((m) => m.value)
        .join(",")}`;
      logger.info("requry of fetch managers", query);
      dispatch(fetchEventsAction({ query }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreateEvent = () => {
    navigation.navigate("CreateEvent");
  };

  return (
    <ScreenWrapper>
      <PageHeader title>Events</PageHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EventSummaryCards events={events} eventManagers={eventManagers} />

        <CreateEventButtons
          onCreateEvent={onCreateEvent}
          onManageManagers={() => {}}
        />

        {/* <SectionTitle>Filters</SectionTitle>
        <SectionSubtitle>Click to select below filters</SectionSubtitle>
        <EventsFilterCards /> */}

        <TaskMainCard>
          <TaskHeader>
            <SectionTitle>Events</SectionTitle>
            <SectionSubtitle>{MONITOR_EV}</SectionSubtitle>
          </TaskHeader>

          {events.length === 0 ? (
            <EmptyText>No Events available</EmptyText>
          ) : (
            events.map((event) => (
              <EventItem
                key={event.uid}
                event={mapEventForUI(event)}
                onViewDetails={() =>
                  navigation.navigate("EventDetails", { eventUid: event.uid })
                }
              />
            ))
          )}
        </TaskMainCard>
      </ScrollView>
    </ScreenWrapper>
  );
};

const PageTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography["heading-h2"]["font-size"]}px;
  font-weight: ${({ theme }) => theme.typography["heading-h2"]["font-weight"]};
  color: ${({ theme }) => theme.colors.black};
  padding: 20px 0 16px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography["heading-h3"]["font-size"]}px;
  font-weight: ${({ theme }) => theme.typography["heading-h3"]["font-weight"]};
  color: ${({ theme }) => theme.colors.black};
`;

const SectionSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  margin-top: 2px;
  margin-bottom: 12px;
`;

const TaskMainCard = styled.View.attrs(({ theme }) => ({
  style: theme?.shadows?.["level-3"] || {},
}))`
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 100px;
  padding: 0 10px;
`;

const TaskHeader = styled.View`
  padding: 20px 20px 10px;
`;

const Loader = styled(ActivityIndicator)`
  margin: 40px 0;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  padding: 30px 20px;
`;

export default EventsDashboard;
