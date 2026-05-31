import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";

import { DrawerProvider } from "./navigation/DrawerContext";
import DrawerOverlay from "./navigation/DrawerOverlay";
import { navigationRef } from "./navigation/navigationRef";
import { store } from "./redux/store";
import AppRoutes from "./Routes";
import useTheme from "./theme/useTheme";

const AppWithTheme = () => {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NavigationContainer ref={navigationRef}>
            <DrawerProvider>
              <View style={{ flex: 1 }}>
                <AppRoutes />
                <DrawerOverlay />
              </View>
            </DrawerProvider>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default function App() {
  return <AppWithTheme />;
}
