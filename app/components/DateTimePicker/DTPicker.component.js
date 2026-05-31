import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import { isAndroidOS, isIOS } from "../../constants/global.constants";

const DTPicker = ({ mode, value, onChange, name, children }) => {
  const iosDisplay = mode === "time" ? "spinner" : "inline";
  const androidDisplay = mode === "time" ? "default" : "calendar";

  const [showPicker, setShowPicker] = useState(false);

  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(-8);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  // Handle open picker
  const openPicker = () => {
    fadeAnim.value = 0;
    slideAnim.value = -30;
    setShowPicker(true);
    fadeAnim.value = withSpring(1, { duration: 280 });
    slideAnim.value = withSpring(0, {
      damping: 65,
      stiffness: 1000,
      mass: 5,
      overshootClamping: false,
      energyThreshold: 6e-9,
      velocity: 2,
    });
  };

  // Handle close Picker
  const closePicker = () => {
    fadeAnim.value = withSpring(0, { duration: 280 }, (finished) => {
      if (finished) {
        runOnJS(setShowPicker)(false);
      }
    });
    slideAnim.value = withTiming(-8, { duration: 280 });
  };

  const handlePickerChange = (e, selectedDate) => {
    const pickedValue = selectedDate.toISOString();

    if (selectedDate && isAndroidOS) {
      onChange({ target: { name, value: pickedValue } });
      setShowPicker(false);
      return;
    }
    onChange({ target: { name, value: pickedValue } });
  };

  const handleTOPPress = () => {
    if (isIOS) {
      showPicker ? closePicker() : openPicker();
    } else {
      setShowPicker((prev) => !prev);
    }
  };

  return (
    <>
      <StyledTOP onPress={handleTOPPress}>{children}</StyledTOP>

      {showPicker &&
        (isIOS ? (
          <Animated.View style={[animatedStyle]}>
            <DateTimePicker
              mode={mode}
              display={iosDisplay}
              value={new Date(value)}
              onValueChange={handlePickerChange}
            />
          </Animated.View>
        ) : (
          <DateTimePicker
            mode={mode}
            display={androidDisplay}
            value={new Date(value)}
            onDismiss={() => setShowPicker(false)}
            onValueChange={handlePickerChange}
          />
        ))}
    </>
  );
};

export default DTPicker;

const StyledTOP = styled.TouchableOpacity`
  /* width: "100%"; */
  border-radius: 30px;
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  border: 1px solid #e0e0e0;
  justify-content: center;
  color: "#000";
  background-color: #fff;
  /* margin: 20px 0; */
`;
