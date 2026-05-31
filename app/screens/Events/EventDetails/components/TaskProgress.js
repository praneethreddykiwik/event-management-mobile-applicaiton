import { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

import { tasksSelector } from "../../../../redux/tasks/tasks.slice";

const STATUSES = [
  { key: "pending", label: "Pending", color: "#edab27" },
  { key: "assigned", label: "Assigned", color: "#0cc657" },
  { key: "accepted", label: "Accepted", color: "#26C867" },
  { key: "ready", label: "Ready", color: "#4cd17d" },
  { key: "in_progress", label: "In Progress", color: "#3b82f6" },
  { key: "completed", label: "Completed", color: "#10b981" },
  { key: "declined", label: "Declined", color: "#d83232" },
  { key: "cancelled", label: "Cancelled", color: "#ef4444" },
  { key: "deleted", label: "Deleted", color: "#9ca3af" },
  { key: "not_started", label: "Not Started", color: "#a3a3a3" },
];

export const TaskProgress = () => {
  const { tasksByEvent } = useSelector(tasksSelector);

  const { rows, total } = useMemo(() => {
    const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s.key]: 0 }), {});
    (tasksByEvent || []).forEach((task) => {
      if (counts[task.taskStatus] !== undefined) {
        counts[task.taskStatus] += 1;
      }
    });
    const t = Object.values(counts).reduce((a, b) => a + b, 0);
    return {
      total: t,
      rows: STATUSES.map((s) => ({ ...s, value: counts[s.key] })),
    };
  }, [tasksByEvent]);

  const present = rows.filter((r) => r.value > 0);

  return (
    <Card>
      <HeadingRow>
        <Heading>Task Progress</Heading>
        <TotalText>{total} tasks</TotalText>
      </HeadingRow>

      {total === 0 ? (
        <EmptyText>No tasks yet for this event.</EmptyText>
      ) : (
        <>
          <Bar>
            {present.map((s) => (
              <BarSeg
                key={s.key}
                style={{
                  flex: s.value,
                  backgroundColor: s.color,
                }}
              />
            ))}
          </Bar>

          <Legend>
            {present.map((s) => (
              <LegendRow key={s.key}>
                <LegendDot style={{ backgroundColor: s.color }} />
                <LegendLabel>{s.label}</LegendLabel>
                <LegendValue>{s.value}</LegendValue>
              </LegendRow>
            ))}
          </Legend>
        </>
      )}
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

const HeadingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Heading = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const TotalText = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
`;

const Bar = styled.View`
  flex-direction: row;
  height: 14px;
  border-radius: 7px;
  overflow: hidden;
  background-color: #f3f4f6;
  margin-bottom: 14px;
`;

const BarSeg = styled.View`
  height: 100%;
`;

const Legend = styled.View`
  gap: 6px;
`;

const LegendRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const LegendDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

const LegendLabel = styled.Text`
  flex: 1;
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors.black};
`;

const LegendValue = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const EmptyText = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  padding: 12px 0;
  text-align: center;
`;
