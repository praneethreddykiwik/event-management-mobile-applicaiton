import styled from "styled-components/native";
import { StyledHeading } from "../../Styled/Typography.styled";

const PageHeader = ({ children, title }) => {
  return (
    <StyledView>
      {title ? <StyledHeading>{children}</StyledHeading> : children}
      <Divider />
    </StyledView>
  );
};

const StyledView = styled.View`
  padding: 0 20px;
  height: 76px;
  justify-content: center;
  /* border: 1px solid red; */
`;

const Divider = styled.View`
  height: 1px;
  background-color: #000; // check here
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default PageHeader;
