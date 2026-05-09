import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";

import AppRoutes from "./Routes";
import { store } from "./redux/store";
import useTheme from "./theme/useTheme";

// Compare here/.
const AppWithTheme = () => {
  const theme = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default function App() {
  return <AppWithTheme />;
}
