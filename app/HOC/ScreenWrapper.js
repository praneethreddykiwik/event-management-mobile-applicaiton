import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const ScreenWrapper = ({ children }) => {
  return (
    <Gradient colors={["#F0FDF4", "#BBF7D0"]}>
      <Safe edges={["top", "left", "right"]}>{children}</Safe>
    </Gradient>
  );
};

const Gradient = styled(LinearGradient)`
  flex: 1;
`;

const Safe = styled(SafeAreaView)`
  flex: 1;
`;
