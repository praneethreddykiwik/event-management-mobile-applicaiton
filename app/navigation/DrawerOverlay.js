import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { useDrawer } from "./DrawerContext";
import Sidebar from "./Sidebar";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = Math.min(300, SCREEN_WIDTH * 0.82);
const VELOCITY_OPEN_THRESHOLD = 600;
const EDGE_SWIPE_HIT_WIDTH = 22;

const SPRING_OPEN = { damping: 22, stiffness: 180, mass: 0.9 };
const SPRING_CLOSE = { damping: 26, stiffness: 220, mass: 0.9 };

const DrawerOverlay = () => {
  const { progress, close } = useDrawer();

  // Mirrors progress > 0.01 onto a JS boolean so we can flip pointerEvents
  // on the backdrop wrapper (only flips once per open/close, not per frame).
  const [drawerActive, setDrawerActive] = useState(false);
  useAnimatedReaction(
    () => progress.value > 0.01,
    (isActive, prev) => {
      if (prev !== isActive) {
        runOnJS(setDrawerActive)(isActive);
      }
    },
    [],
  );

  // Edge-swipe pan: drags drawer in from the left edge when closed.
  const edgeSwipe = Gesture.Pan()
    .activeOffsetX([8, 9999])
    .failOffsetY([-12, 12])
    .hitSlop({ left: 0, top: 0, bottom: 0, width: EDGE_SWIPE_HIT_WIDTH })
    .onUpdate((e) => {
      "worklet";
      const next = Math.min(1, Math.max(0, e.translationX / DRAWER_WIDTH));
      progress.value = next;
    })
    .onEnd((e) => {
      "worklet";
      const shouldOpen =
        progress.value > 0.5 || e.velocityX > VELOCITY_OPEN_THRESHOLD;
      progress.value = withSpring(
        shouldOpen ? 1 : 0,
        shouldOpen ? SPRING_OPEN : SPRING_CLOSE,
      );
    });

  // Drag-to-close on the open drawer surface (only meaningful when drawer
  // is open — but it's cheap to always have it attached).
  const drawerPan = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .failOffsetY([-14, 14])
    .onUpdate((e) => {
      "worklet";
      const delta = e.translationX / DRAWER_WIDTH;
      const next = Math.min(1, Math.max(0, 1 + delta));
      progress.value = next;
    })
    .onEnd((e) => {
      "worklet";
      const shouldClose =
        progress.value < 0.5 || e.velocityX < -VELOCITY_OPEN_THRESHOLD;
      progress.value = withSpring(
        shouldClose ? 0 : 1,
        shouldClose ? SPRING_CLOSE : SPRING_OPEN,
      );
    });

  // Tap on backdrop closes drawer.
  const backdropTap = Gesture.Tap().onEnd(() => {
    "worklet";
    runOnJS(close)();
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.5,
  }));

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [-DRAWER_WIDTH, 0]),
      },
    ],
  }));

  return (
    <>
      {/* Edge-swipe hit area: thin transparent strip down the left edge. */}
      <GestureDetector gesture={edgeSwipe}>
        <Animated.View
          pointerEvents="box-only"
          style={styles.edgeSwipeZone}
        />
      </GestureDetector>

      {/* Backdrop. Wrapper toggles pointerEvents so it can't swallow taps
          on the underlying screen while the drawer is fully closed. */}
      <Animated.View
        pointerEvents={drawerActive ? "auto" : "none"}
        style={styles.backdropWrapper}
      >
        <GestureDetector gesture={backdropTap}>
          <Animated.View style={[styles.backdrop, backdropStyle]} />
        </GestureDetector>
      </Animated.View>

      {/* Sidebar panel. */}
      <GestureDetector gesture={drawerPan}>
        <Animated.View
          pointerEvents={drawerActive ? "auto" : "none"}
          style={[styles.sidebar, { width: DRAWER_WIDTH }, sidebarStyle]}
        >
          <Sidebar />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  edgeSwipeZone: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: EDGE_SWIPE_HIT_WIDTH,
    zIndex: 5,
  },
  backdropWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    zIndex: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 0 },
    elevation: 16,
  },
});

export default DrawerOverlay;
