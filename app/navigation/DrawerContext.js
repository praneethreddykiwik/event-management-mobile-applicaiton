import { createContext, useCallback, useContext, useMemo } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";

const DrawerContext = createContext(null);

const SPRING_OPEN = {
  damping: 22,
  stiffness: 180,
  mass: 0.9,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.01,
};

const SPRING_CLOSE = {
  damping: 26,
  stiffness: 220,
  mass: 0.9,
  overshootClamping: true,
};

export const DrawerProvider = ({ children }) => {
  const progress = useSharedValue(0);

  const open = useCallback(() => {
    progress.value = withSpring(1, SPRING_OPEN);
  }, [progress]);

  const close = useCallback(() => {
    progress.value = withSpring(0, SPRING_CLOSE);
  }, [progress]);

  const toggle = useCallback(() => {
    if (progress.value > 0.5) {
      progress.value = withSpring(0, SPRING_CLOSE);
    } else {
      progress.value = withSpring(1, SPRING_OPEN);
    }
  }, [progress]);

  const value = useMemo(
    () => ({ progress, open, close, toggle }),
    [progress, open, close, toggle],
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error("useDrawer must be used inside <DrawerProvider>");
  }
  return ctx;
};
