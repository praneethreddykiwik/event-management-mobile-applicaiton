import { useRoute } from "@react-navigation/native";
import styled from "styled-components/native";

import PageHeader from "../../components/Headers/PageHeader/PageHeader";
import { ScreenWrapper } from "../../HOC/ScreenWrapper";

const Placeholder = () => {
  const route = useRoute();
  return (
    <ScreenWrapper>
      <PageHeader title>{route.name}</PageHeader>
      <Body>
        <Title>{route.name}</Title>
        <Subtitle>This screen is not implemented yet on mobile.</Subtitle>
      </Body>
    </ScreenWrapper>
  );
};

const Body = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  gap: 6px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #000;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

export default Placeholder;
