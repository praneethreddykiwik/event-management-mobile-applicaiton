import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "./navigation/routes";
import CreateEditEvent from "./screens/Events/CreateEvent/CreateEditEvent.page";
import EventDetails from "./screens/Events/EventDetails/EventDetails.page";
import EventsDashboard from "./screens/Events/EventsDashboard/EventsDashboard.page";
import Placeholder from "./screens/Placeholder/Placeholder.page";
import CreateTask from "./screens/Tasks/CreateTask.page";
import Tasks from "./screens/Tasks/Tasks.page";
import OurServices from "./screens/OurServices/OurServicesPage";
import WhyChoose from "./screens/WhyChooseHelm/WhyChooseHelmPage";

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.eventsDashboard}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 220,
      }}
    >
      <Stack.Screen name={ROUTES.home} component={Placeholder} />
      <Stack.Screen name={ROUTES.login} component={Placeholder} />
      <Stack.Screen name={ROUTES.registration} component={Placeholder} />
      <Stack.Screen name={ROUTES.twoFactorAuth} component={Placeholder} />
      <Stack.Screen name={ROUTES.accountSettings} component={Placeholder} />
      <Stack.Screen name={ROUTES.newsFeed} component={Placeholder} />
      <Stack.Screen name={ROUTES.getInTouch} component={Placeholder} />
      <Stack.Screen name={ROUTES.ourServices} component={OurServices} />

      <Stack.Screen name={ROUTES.eventsDashboard} component={EventsDashboard} />
      <Stack.Screen name={ROUTES.eventsDetails} component={EventDetails} />
      <Stack.Screen name={ROUTES.createEvent} component={CreateEditEvent} />
      <Stack.Screen name={ROUTES.editEvent} component={CreateEditEvent} />

      <Stack.Screen name={ROUTES.tasks} component={Tasks} />
      <Stack.Screen name={ROUTES.createTask} component={CreateTask} />

      <Stack.Screen name={ROUTES.vendor} component={Placeholder} />
      <Stack.Screen name={ROUTES.supervisor} component={Placeholder} />
      <Stack.Screen name={ROUTES.qa} component={Placeholder} />

      <Stack.Screen name={ROUTES.userManagement} component={Placeholder} />
      <Stack.Screen name={ROUTES.marketPlace} component={Placeholder} />
      <Stack.Screen name={ROUTES.venues} component={Placeholder} />
      <Stack.Screen name={ROUTES.whyHelm} component={WhyChoose} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
