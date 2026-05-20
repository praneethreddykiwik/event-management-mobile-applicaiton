import styled from "styled-components/native";

// Compare here/.
const EventSummaryCards = ({ events, eventManagers }) => (
  <Row>
    <SummaryCard label="Total Events" value={events.length} />
    <SummaryCard label="Event Managers" value={eventManagers.length} />
  </Row>
);

const SummaryCard = ({ label, value }) => (
  <Card>
    <Value>{value}</Value>
    <Label>{label}</Label>
  </Card>
);

const Row = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
`;

const Card = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 14px;
  padding: 16px;
  align-items: center;
  ${({ theme }) => theme.shadows["level-3"]}
`;

const Value = styled.Text`
  font-size: 32px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black};
`;

const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"].fontSize}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  margin-top: 4px;
  text-align: center;
`;

export default EventSummaryCards;
