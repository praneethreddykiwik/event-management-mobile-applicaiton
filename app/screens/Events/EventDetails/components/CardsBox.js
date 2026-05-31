import { useSelector } from "react-redux";
import styled from "styled-components/native";

import { Icon } from "../../../../components/Icons/Icons";
import { eventsSelector } from "../../../../redux/events/events.slice";

export const CardsBox = () => {
  const { eventDetails: event } = useSelector(eventsSelector);

  return (
    <Stack>
      <Card>
        <Heading>Assigned Manager</Heading>
        <ManagerRow>
          <Icon variant="person" size={22} color="#444" />
          <ManagerName numberOfLines={1}>
            {event.firstName || event.userName || "Unassigned"}
          </ManagerName>
        </ManagerRow>
      </Card>

      <Card>
        <Heading>Description</Heading>
        <Description>
          {event.comments || "No description provided."}
        </Description>
      </Card>
    </Stack>
  );
};

const Stack = styled.View`
  gap: 12px;
`;

const Card = styled.View.attrs(({ theme }) => ({
  style: theme?.shadows?.["level-3"] || {},
}))`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 14px 18px;
  border: ${({ theme }) => theme.borders["border-gray"]};
`;

const Heading = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 8px;
`;

const ManagerRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ManagerName = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-regular"]["font-size"]}px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;
`;

const Description = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors.black};
  line-height: 20px;
`;
