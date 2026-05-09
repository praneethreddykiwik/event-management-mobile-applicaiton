import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

import { eventsSelector } from "../../../redux/events/events.slice";
import { userSelecter } from "../../../redux/users/users.slice";
import { fetchEventsAction } from "../../../redux/events/events.action";
import { fetchManagersAction } from "../../../redux/users/users.actions";
import { ROLES } from "../../../constants/roles";
import { INITIAL_FILTERS } from "../../../constants/events.constants";
import { mapEventForUI } from "../../../helpers/Dashboard.helper";

import EventSummaryCards from "./components/EventSummaryCards";
import CreateEventButtons from "./components/CreateEventButtons";
import EventsFilterCards from "./components/EventsFilterCards";
import EventItem from "./components/EventItem";

// Compare here/. need full comparision and re-write.
const EventsDashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { events, eventsLoading } = useSelector(eventsSelector);
  const { eventManagers } = useSelector(userSelecter);

  useEffect(() => {
    dispatch(fetchManagersAction());
    const query = `?status=${INITIAL_FILTERS.filter((fl) => fl.selected)
      .map((m) => m.value)
      .join(",")}`;
    dispatch(fetchEventsAction({ query }));
  }, []);

  const onCreateEvent = () => {
    navigation.navigate("CreateEvent");
  };

  console.log("events render here: ", events);

  return (
    <SafeArea>
      <Scroll showsVerticalScrollIndicator={false}>
        <PageTitle>Events</PageTitle>

        <EventSummaryCards events={events} eventManagers={eventManagers} />

        <CreateEventButtons
          onCreateEvent={onCreateEvent}
          onManageManagers={() => {}}
        />

        <SectionTitle>Filters</SectionTitle>
        <SectionSubtitle>Click to select below filters</SectionSubtitle>
        <EventsFilterCards />

        <TaskMainCard>
          <TaskHeader>
            <SectionTitle>Events</SectionTitle>
            <SectionSubtitle>Manage and monitor all events</SectionSubtitle>
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
      </Scroll>
    </SafeArea>
  );
};

// Create the BlueBlack HOC for this component // Compare here.
const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors["light-blue"]};
`;

const Scroll = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

const PageTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography["heading-h2"].fontSize}px;
  font-weight: ${({ theme }) => theme.typography["heading-h2"].fontWeight};
  color: ${({ theme }) => theme.colors.black};
  padding: 20px 0 16px;
`;

const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography["heading-h3"].fontSize}px;
  font-weight: ${({ theme }) => theme.typography["heading-h3"].fontWeight};
  color: ${({ theme }) => theme.colors.black};
`;

const SectionSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"].fontSize}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  margin-top: 2px;
  margin-bottom: 12px;
`;

const TaskMainCard = styled.View.attrs(({ theme }) => ({
  style: theme?.shadows?.["level-2"] || {},
}))`
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 100px;
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
  font-size: ${({ theme }) => theme.typography["body-small"].fontSize}px;
  padding: 30px 20px;
`;

export default EventsDashboard;
