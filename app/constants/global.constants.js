import { Platform } from "react-native";

export const currentOS = Platform.OS;

export const isIOS = currentOS === "ios";
export const isAndroidOS = currentOS === "android";
