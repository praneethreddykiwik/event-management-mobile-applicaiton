import styled from "styled-components/native";

const ScrollView = ({ children }) => {
  return <StyledScrollView>{children}</StyledScrollView>;
};

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

export default ScrollView;
