import { useSelector } from "react-redux";
import styled from "styled-components/native";

import { Icon } from "../../../../components/Icons/Icons";
import { eventsSelector } from "../../../../redux/events/events.slice";
import { dateObj } from "../../../../utils/utils";

export const DetailsBox = () => {
  const { eventDetails: event } = useSelector(eventsSelector);
  const { date, time } = event.scheduledAt
    ? dateObj(event.scheduledAt)
    : { date: "—", time: "—" };

  const rows = [
    { type: "Date", info: date, icon: "date-range" },
    { type: "Time", info: time, icon: "schedule" },
    { type: "Venue", info: event.venue || "—", icon: "map" },
    {
      type: "Expected Attendees",
      info: event.expectedAttendees ?? "—",
      icon: "group",
    },
  ];

  return (
    <Card>
      <Heading>Event Details</Heading>
      <Rows>
        {rows.map((row) => (
          <Row key={row.type}>
            <IconWrap>
              <Icon variant={row.icon} size={22} color="#0cc657" />
            </IconWrap>
            <RowText>
              <RowType>{row.type}</RowType>
              <RowInfo numberOfLines={2}>{String(row.info)}</RowInfo>
            </RowText>
          </Row>
        ))}
      </Rows>
    </Card>
  );
};

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

const Rows = styled.View`
  gap: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const IconWrap = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background-color: rgba(38, 200, 103, 0.12);
`;

const RowText = styled.View`
  flex: 1;
`;

const RowType = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
`;

const RowInfo = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-regular"]["font-size"]}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
