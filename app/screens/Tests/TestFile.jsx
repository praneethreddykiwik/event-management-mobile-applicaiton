import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import styled from "styled-components/native";
import logger from "../../utils/logger.utils";
import { StyledParagraph } from "../../components/Styled/Typography.styled";

const TestScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [buttonHeight, setButtonHeight] = useState(0);

  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(-8);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  const handleChange = (e, selectedDate) => {
    logger.info("Selected date: ", selectedDate);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const openPicker = () => {
    fadeAnim.value = 0;
    slideAnim.value = -8;
    setShowPicker(true);
    fadeAnim.value = withTiming(1, { duration: 280 });
    slideAnim.value = withSpring(0, {
      damping: 80,
      stiffness: 1010,
      mass: 4,
      overshootClamping: false,
      energyThreshold: 6e-9,
      velocity: 0,
      //   reduceMotion: ReduceMotion.System,
    });
  };

  const closePicker = () => {
    fadeAnim.value = withTiming(0, { duration: 200 }, (finished) => {
      if (finished) runOnJS(setShowPicker)(false);
    });
    slideAnim.value = withTiming(-8, { duration: 200 });
  };

  const handleTCHOPChange = () => {
    if (Platform.OS === "ios") {
      showPicker ? closePicker() : openPicker();
    } else {
      setShowPicker((prev) => !prev);
    }
  };

  const formattedDate = date.toISOString().split("T")[0];

  return (
    <StyledView>
      <StyledParagraph>Select a Date for your Date: </StyledParagraph>
      <PickerContainer>
        <StyledTCHOP
          onPress={handleTCHOPChange}
          onLayout={(e) => setButtonHeight(e.nativeEvent.layout.height)}
        >
          <Text>{formattedDate}</Text>
        </StyledTCHOP>
        {showPicker &&
          (Platform.OS === "ios" ? (
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: buttonHeight,
                  left: 35,
                  right: 0,
                  zIndex: 100,
                },
                animatedStyle,
              ]}
            >
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onValueChange={handleChange}
              />
            </Animated.View>
          ) : (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onValueChange={handleChange}
            />
          ))}
      </PickerContainer>
    </StyledView>
  );
};

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PickerContainer = styled.View`
  position: relative;
  border: 1px solid red;
  align-self: stretch;
  /* align-items: center; */
`;

const StyledTCHOP = styled.TouchableOpacity`
  border-width: 1px;
  border-color: "#ccc";
  border-radius: 10px;
  padding: 15px;
`;

export default TestScreen;
