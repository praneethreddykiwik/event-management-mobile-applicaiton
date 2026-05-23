import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { eventsSelector } from "../../../../redux/events/events.slice";
import { eventsFilterAction } from "../../../../redux/events/events.action";
import { getStatusColor } from "../../../../utils/utils";
import { INITIAL_FILTERS } from "../../../../constants/events.constants";

const EventsFilterCards = () => {
  const { eventsStatusCounts, selectedEventFilters } = useSelector(eventsSelector);
  const dispatch = useDispatch();

  const isEveryFilterSelected = () => {
    return INITIAL_FILTERS.every((es) => {
      const record = selectedEventFilters.find((sf) => sf.value === es.value);
      return record?.selected;
    });
  };

  const isFilterSelected = (key) => {
    if (key === "total") return isEveryFilterSelected();
    return selectedEventFilters.find((el) => el.value === key)?.selected;
  };

  const onClickFilter = (selectedKey) => {
    if (selectedKey === "total") {
      // Compare here, move this to totalClickHandler
      const isEverySelected = isEveryFilterSelected();
      const arr = selectedEventFilters.map((el) => ({
        ...el,
        selected: !isEverySelected,
      }));
      dispatch(eventsFilterAction(arr));
      return;
    }

    const arr = selectedEventFilters.map((el) => {
      if (el.value === selectedKey) {
        return { ...el, selected: !el.selected };
      }
      return el;
    });
    dispatch(eventsFilterAction(arr));
  };

  return (
    <CardsRow horizontal showsHorizontalScrollIndicator={false}>
      {Object.keys(eventsStatusCounts).map((key) => {
        const selected = isFilterSelected(key);
        const color = getStatusColor(key, eventsStatusCounts);
        return (
          <FilterChip
            key={key}
            selected={selected}
            color={color}
            onPress={() => onClickFilter(key)}
          >
            <ChipLabel selected={selected} color={color}>
              {key.replace(/_/g, " ")}
            </ChipLabel>
            <ChipCount selected={selected} color={color}>
              {eventsStatusCounts[key]}
            </ChipCount>
          </FilterChip>
        );
      })}
    </CardsRow>
  );
};

const CardsRow = styled.ScrollView.attrs({
  contentContainerStyle: {
    gap: 10,
    paddingVertical: 4,
    paddingBottom: 20,
  },
})``;

const FilterChip = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 20px;
  border-width: 1.5px;
  border-color: ${({ color }) => color};
  background-color: ${({ selected, color }) => (selected ? color : "transparent")};
`;

const ChipLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption["font-size"]}px;
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ selected, color }) => (selected ? "#fff" : color)};
`;

const ChipCount = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption["font-size"]}px;
  font-weight: 700;
  color: ${({ selected, color }) => (selected ? "#fff" : color)};
`;

export default EventsFilterCards;
