import styled from "styled-components/native";

const height = ({ small }) => (small ? "28px" : "40px");
const padding = ({ small }) => (small ? "0px 20px" : "6px 20px");

export const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  justify-content: center;
`;

export const ButtonImage = styled.Image`
  width: 18px;
  height: 18px;
`;

export const StyledBaseButton = styled.TouchableOpacity`
  height: ${height};
  width: 100%;
  border-radius: 30px;
  padding: ${padding};
  background-color: #26c867;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const StyledDeleteBtn = styled(StyledBaseButton)`
  background-color: #d63a2f;
`;

export const StyledOutlinedButton = styled.TouchableOpacity`
  height: ${height};
  width: 100%;
  border-radius: 30px;
  padding: ${padding};
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 100px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.black};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const StyledNoBorderButton = styled.TouchableOpacity`
  height: ${height};
  width: 100%;
  border-radius: 30px;
  padding: ${padding};
  background-color: transparent;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const StyledSecButton = styled.TouchableOpacity`
  height: ${height};
  width: 100%;
  border-radius: 30px;
  padding: ${padding};
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 100px;
  border-width: 1px;
  border-color: #eee;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const StyledTransparentButton = styled.TouchableOpacity`
  height: ${height};
  border-radius: 30px;
  padding: ${padding};
  background-color: transparent;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const StyledIconButton = styled.TouchableOpacity`
  height: ${height};
  width: 100%;
  border-radius: 30px;
  padding: ${padding};
  background-color: #26c867;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${({ $whiteText, theme }) => ($whiteText ? theme.colors.white : theme.colors.black)};
`;
