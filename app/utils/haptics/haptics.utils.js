import * as Haptics from "expo-haptics";

export const triggerHaptics = () => {
  Haptics.selectionAsync();
};

export const triggerSuccessHaptics = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const triggerErrorHaptics = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

export const triggerHeavyHaptics = () => {
  Haptics.impactAsync(Haptics.NotificationFeedbackType.Medium);
};
