import styled from "styled-components/native";

const ScrollView = ({ children }) => {
  return <StyledScrollView>{children}</StyledScrollView>;
};

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
`;

export default ScrollView;
