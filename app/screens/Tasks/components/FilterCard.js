import styled from "styled-components/native";

import { snakeToCamel } from "../../../utils/utils";

const camelToWords = (str) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const FilterCard = ({ objKey, value, color, onPress, selected }) => (
  <StyledCard onPress={onPress} $selected={selected} activeOpacity={0.85}>
    <Value color={color}>{value}</Value>
    <Label>{camelToWords(snakeToCamel(objKey))}</Label>
  </StyledCard>
);
// Dummy commit
const StyledCard = styled.TouchableOpacity.attrs(({ theme }) => ({
  style: theme?.shadows?.["level-3"] || {},
}))`
  flex-grow: 0;
  flex-basis: 48%;
  background-color: ${({ theme, $selected }) =>
    $selected ? "#e9f8e5" : theme.colors.white};
  border-radius: 14px;
  padding: 12px 14px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border: ${({ theme }) => theme.borders["border-gray"]};
`;

const Value = styled.Text`
  font-size: ${({ theme }) => theme.typography["heading-h3"]["font-size"]}px;
  font-weight: ${({ theme }) => theme.typography["heading-h3"]["font-weight"]};
  color: ${({ color }) => color || "#000"};
`;

const Label = styled.Text`
  font-size: ${({ theme }) => theme.typography["body-small"]["font-size"]}px;
  color: ${({ theme }) => theme.colors["text-gray-color"]};
  flex-shrink: 1;
`;

export default FilterCard;
