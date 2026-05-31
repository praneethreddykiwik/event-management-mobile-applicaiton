import { Icon } from "../Icons/Icons";
import {
  ButtonContent,
  ButtonImage,
  ButtonText,
  StyledBaseButton,
  StyledDeleteBtn,
  StyledIconButton,
  StyledNoBorderButton,
  StyledOutlinedButton,
  StyledSecButton,
  StyledTransparentButton,
} from "../Styled/Buttons.styled";

export const Button = ({
  type,
  children,
  onClick,
  icon,
  image,
  whiteText,
  disabled,
  small,
}) => {
  const props = {
    onPress: onClick,
    small,
    $whiteText: whiteText,
    disabled,
  };

  const renderContent = () => (
    <ButtonContent>
      {icon && <Icon variant={icon} color={whiteText ? "#fff" : undefined} />}
      {image && <ButtonImage source={{ uri: image }} />}
      {children && <ButtonText $whiteText={whiteText}>{children}</ButtonText>}
    </ButtonContent>
  );

  switch (type) {
    case "outlined":
      return (
        <StyledOutlinedButton {...props}>
          {renderContent()}
        </StyledOutlinedButton>
      );

    case "no-border":
      return (
        <StyledNoBorderButton {...props}>
          {renderContent()}
        </StyledNoBorderButton>
      );

    case "secondary":
      return <StyledSecButton {...props}>{renderContent()}</StyledSecButton>;

    case "transparent":
      return (
        <StyledTransparentButton {...props}>
          {renderContent()}
        </StyledTransparentButton>
      );

    case "delete":
      return <StyledDeleteBtn {...props}>{renderContent()}</StyledDeleteBtn>;

    case "icon":
      return <StyledIconButton {...props}>{renderContent()}</StyledIconButton>;

    case "primary":
      return <StyledBaseButton {...props}>{renderContent()}</StyledBaseButton>;

    default:
      return <StyledBaseButton {...props}>{renderContent()}</StyledBaseButton>;
  }
};
