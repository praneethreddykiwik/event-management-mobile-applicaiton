import { useEffect, useState } from "react";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { Icon } from "../components/Icons/Icons";
import { ScreenWrapper } from "../HOC/ScreenWrapper";
import { useDrawer } from "./DrawerContext";
import { MENU_SECTIONS } from "./menu.config";
import { navigateRef, navigationRef } from "./navigationRef";

const LAYOUT_TRANSITION = LinearTransition.duration(220).easing(
  Easing.out(Easing.cubic),
);

const Sidebar = () => {
  const { close } = useDrawer();

  const [currentRoute, setCurrentRoute] = useState(() =>
    navigationRef.isReady() ? navigationRef.getCurrentRoute()?.name : undefined,
  );

  useEffect(() => {
    if (navigationRef.isReady()) {
      setCurrentRoute(navigationRef.getCurrentRoute()?.name);
    }
    const unsubscribe = navigationRef.addListener?.("state", () => {
      setCurrentRoute(navigationRef.getCurrentRoute()?.name);
    });
    return unsubscribe;
  }, []);

  const [openGroup, setOpenGroup] = useState("pages");

  const goTo = (routeName) => {
    if (!routeName) return;
    close();
    requestAnimationFrame(() => navigateRef(routeName)); // check here
  };

  const toggleGroup = (key) => {
    setOpenGroup((prev) => (prev === key ? null : key));
  };

  return (
    <ScreenWrapper>
      <Brand>
        <BrandDot />
        <BrandText>EVNT</BrandText>
      </Brand>

      <MenuScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {MENU_SECTIONS.map((section) => {
          if (!section.children) {
            const isActive = currentRoute === section.route;
            return (
              <Row
                key={section.key}
                $active={isActive}
                onPress={() => goTo(section.route)}
                activeOpacity={0.75}
              >
                <Icon
                  variant={section.icon}
                  size={20}
                  color={isActive ? "#0cc657" : "#444"}
                />
                <RowLabel $active={isActive}>{section.label}</RowLabel>
              </Row>
            );
          }

          const isOpen = openGroup === section.key;
          return (
            <GroupBlock key={section.key} layout={LAYOUT_TRANSITION}>
              <Row
                onPress={() => toggleGroup(section.key)}
                activeOpacity={0.75}
              >
                <Icon variant={section.icon} size={20} color="#444" />
                <RowLabel>{section.label}</RowLabel>
                <Icon
                  variant={isOpen ? "expand-less" : "expand-more"}
                  size={20}
                  color="#666"
                />
              </Row>

              {isOpen && (
                <SubList
                  entering={FadeIn.duration(160)}
                  exiting={FadeOut.duration(120)}
                  layout={LAYOUT_TRANSITION}
                >
                  {section.children.map((item) => {
                    const isActive = currentRoute === item.route;
                    return (
                      <SubRow
                        key={item.label}
                        $active={isActive}
                        onPress={() => goTo(item.route)}
                        activeOpacity={0.75}
                      >
                        <Icon
                          variant={item.icon}
                          size={18}
                          color={isActive ? "#0cc657" : "#666"}
                        />
                        <SubLabel $active={isActive}>{item.label}</SubLabel>
                      </SubRow>
                    );
                  })}
                </SubList>
              )}
            </GroupBlock>
          );
        })}
      </MenuScroll>

      <Footer>
        <FooterText>v1.0.0</FooterText>
      </Footer>
    </ScreenWrapper>
  );
};

const Brand = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 26px 20px 18px;
  border-bottom-width: 1px;
  border-bottom-color: #eef0ef;
`;

const BrandDot = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: #26c867;
`;

const BrandText = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: #000;
  letter-spacing: 1px;
`;

const MenuScroll = styled.ScrollView`
  flex: 1;
  padding-top: 8px;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  background-color: ${({ $active }) => ($active ? "#e9f8e5" : "transparent")};
`;

const RowLabel = styled.Text`
  flex: 1;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active }) => ($active ? "#0cc657" : "#222")};
`;

const GroupBlock = styled(Animated.View)`
  margin-bottom: 4px;
`;

const SubList = styled(Animated.View)`
  padding-left: 22px;
  padding-bottom: 4px;
`;

const SubRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 9px 16px;
  border-radius: 8px;
  background-color: ${({ $active }) => ($active ? "#e9f8e5" : "transparent")};
`;

const SubLabel = styled.Text`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active }) => ($active ? "#0cc657" : "#444")};
`;

const Footer = styled.View`
  padding: 14px 20px;
  border-top-width: 1px;
  border-top-color: #eef0ef;
`;

const FooterText = styled.Text`
  font-size: 12px;
  color: #999;
`;

export default Sidebar;
