import styled from "styled-components/native";

const EventSection = ({ children, event, onAddTask }) => {
  return (
    <SectionCard>
      <Header>
        <TitleBlock>
          <EventName numberOfLines={2}>{event.eventName}</EventName>
          {!!event.eventVenue && (
            <EventVenue numberOfLines={1}>{event.eventVenue}</EventVenue>
          )}
        </TitleBlock>

        <AddBtn onPress={() => onAddTask(event)} activeOpacity={0.85}>
          <AddBtnText>+ Add Task</AddBtnText>
        </AddBtn>
      </Header>

      <Divider />

      <TasksList>{children}</TasksList>
    </SectionCard>
  );
};

const SectionCard = styled.View.attrs(({ theme }) => ({
  style: theme?.shadows?.["level-3"] || {},
}))`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 16px;
  border: ${({ theme }) => theme.borders["border-gray"]};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const TitleBlock = styled.View`
  flex: 1;
  gap: 3px;
`;

const EventName = styled.Text`
  font-size: ${({ theme }) => theme.typography["heading-h3"]["font-size"]}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const EventVenue = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
`;

const AddBtn = styled.TouchableOpacity`
  padding: 7px 14px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;

const AddBtnText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 600;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #f0f0f0;
  margin: 14px 0 12px;
`;

const TasksList = styled.View`
  gap: 12px;
`;

export { EventSection };
export default EventSection;
