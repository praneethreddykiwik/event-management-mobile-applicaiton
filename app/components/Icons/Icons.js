import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

export const Icon = ({ variant, onClick, size = 20, color, style, selected, children }) => {
  const theme = useTheme();

  return (
    <MaterialIcons
      name={variant || children}
      size={size}
      color={color || theme.colors.black}
      onPress={onClick}
      style={[selected && { textDecorationLine: "underline" }, style]}
    />
  );
};
