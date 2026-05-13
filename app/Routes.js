import { createNativeStackNavigator } from "@react-navigation/native-stack";
// SCREENS
import EventsDashboard from "./screens/Events/EventsDashboard/EventsDashboard.page";
import CreateEditEvent from "./screens/Events/CreateEvent/CreateEditEvent.page";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./components/CustomTabBar/CustomTabBar.component";

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="EventsDashboard"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} screenOptions />}
    >
      <Tab.Screen name="EventsDashboard" component={EventsDashboard} />
      <Tab.Screen name="CreateEvent" component={CreateEditEvent} />
    </Tab.Navigator>
  );
};

export default AppRoutes;
