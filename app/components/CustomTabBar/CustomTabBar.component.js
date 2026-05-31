import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  triggerHaptics,
  triggerHeavyHaptics,
} from "../../utils/haptics/haptics.utils";

const ROUTE_LABELS = {
  EventsDashboard: "Events",
  EventsDashboard2: "Events2",
  CreateEvent: "Create Event",
  Tasks: "Tasks",
};

const CustomTabBar = ({ state }) => {
  const navigation = useNavigation();
  const tabLayouts = useRef({});
  const translateX = useRef(new Animated.Value(0)).current;
  const [pillWidth, setPillWidth] = useState(0);
  const initializedRef = useRef(false);

  const animateTo = (index, animated = true) => {
    const layout = tabLayouts.current[index];
    if (!layout) return;
    if (!animated) {
      translateX.setValue(layout.x);
      return;
    }
    Animated.spring(translateX, {
      toValue: layout.x,
      useNativeDriver: true,
      tension: 100,
      friction: 9,
    }).start();
  };

  // Animate when active tab changes via navigation (back button, etc.)
  useEffect(() => {
    animateTo(state.index, initializedRef.current);
  }, [state.index]);

  const handleTabLayout = (index, event) => {
    const { x, width } = event.nativeEvent.layout;
    tabLayouts.current[index] = { x, width };

    // Set pill width once (all tabs are equal flex:1 width)
    if (width > 0 && pillWidth === 0) {
      setPillWidth(180);
    }

    // Seed initial position without animation
    if (index === state.index && !initializedRef.current) {
      translateX.setValue(x);
      initializedRef.current = true;
    }
  };

  const handlePress = async (index, routeName) => {
    animateTo(index);
    triggerHeavyHaptics();
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Sliding pill background */}
        {pillWidth > 0 && (
          <Animated.View
            style={[
              styles.activePill,
              {
                width: pillWidth,
                transform: [{ translateX }],
              },
            ]}
          />
        )}

        {/* Tab items */}
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = ROUTE_LABELS[route.name] || route.name;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onLayout={(e) => handleTabLayout(index, e)}
              onPress={() => handlePress(index, route.name)}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.tabLabel, isFocused && styles.tabLabelActive]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
    position: "relative",
  },
  activePill: {
    position: "absolute",
    top: 6,
    bottom: 6,
    left: -1,
    borderRadius: 50,
    backgroundColor: "#26C867",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    zIndex: 1,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
  },
  tabLabelActive: {
    color: "#000",
    fontWeight: "700",
  },
});

export default CustomTabBar;
