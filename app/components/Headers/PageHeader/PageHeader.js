import styled from "styled-components/native";

import { useDrawer } from "../../../navigation/DrawerContext";
import { Icon } from "../../Icons/Icons";
import { StyledHeading } from "../../Styled/Typography.styled";

const PageHeader = ({ children, title }) => {
  const { open } = useDrawer();

  return (
    <Row>
      <MenuBtn onPress={open} hitSlop={12} activeOpacity={0.7}>
        <Icon variant="menu" size={26} color="#000" />
      </MenuBtn>

      <TitleSlot>
        {title ? <StyledHeading>{children}</StyledHeading> : children}
      </TitleSlot>
    </Row>
  );
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 76px;
`;

const MenuBtn = styled.TouchableOpacity`
  padding: 6px;
  border-radius: 10px;
`;

const TitleSlot = styled.View`
  flex: 1;
  justify-content: center;
`;

export default PageHeader;
