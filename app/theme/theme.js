const spacings = {
  "spacing-1": 4,
  "spacing-2": 8,
  "spacing-3": 16,
  "spacing-4": 24,
  "spacing-5": 32,
  "spacing-6": 40,
};

const typography = {
  "display-h1": {
    fontWeight: "700",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  "heading-h2": {
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.25,
  },
  "heading-h3": {
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.15,
  },
  "body-regular": {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  "body-small": {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  caption: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  "button-text": {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

const colors = {
  primary: "#26C867",
  white: "#fff",
  black: "#000",
  "gray-disabled": "#B9B9B9",
  warning: "#E53935",
  "warning-light": "#EE9A98",
  "light-blue": "#F1FAFF",
  "active-color": "#FF4A4A",
  "inactive-color": "#666666",
  "text-gray-color": "#86868d",
};

const fontWeights = {
  default: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
};

const badgeColors = {
  "badge-assigned-primary": "#0cc657",
  "badge-assigned-transparent": "rgba(38, 200, 103, 0.231)",
  "badge-completed-primary": "#0cc657",
  "badge-completed-transparent": "rgba(38, 200, 103, 0.231)",
  "badge-active-primary": "rgba(38, 200, 103, 0.231)",
  "badge-active-transparent": "rgba(38, 200, 103, 0.231)",
  "badge-inactive-primary": "#d83232",
  "badge-inactive-transparent": "rgba(242, 34, 34, 0.294)",
  "badge-inprogress-primary": "#edab27",
  "badge-inprogress-transparent": "rgb(238, 217, 51, 0.3)",
  "badge-notstarted-primary": "#edab27",
  "badge-notstarted-transparent": "rgb(238, 217, 51, 0.3)",
  "badge-cancelled-primary": "#d83232",
  "badge-cancelled-transparent": "rgba(242, 34, 34, 0.294)",
  "badge-declined-primary": "#d83232",
  "badge-declined-transparent": "rgba(242, 34, 34, 0.294)",
  "badge-deleted-primary": "#d83232",
  "badge-deleted-transparent": "rgba(242, 34, 34, 0.294)",
  "badge-pending-primary": "#edab27",
  "badge-pending-transparent": "rgb(238, 217, 51, 0.3)",
  "badge-accepted-primary": colors.white,
  "badge-accepted-transparent": colors.primary,
};

// React Native shadow objects — spread directly into StyleSheet styles
const shadows = {
  "level-1": {
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  "level-2": {
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  "level-3": {
    shadowColor: "#1b1f23",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
};

const borders = {
  "border-disabled": { borderWidth: 1, borderColor: colors["gray-disabled"] },
  "border-warning-light": {
    borderWidth: 1,
    borderColor: colors["warning-light"],
  },
  "border-warning": { borderWidth: 1, borderColor: colors.warning },
  "border-default": { borderWidth: 1, borderColor: colors.black },
  "border-gray": { borderWidth: 1, borderColor: colors["gray-disabled"] },
};

const inputs = {
  "base-input": {
    paddingVertical: 23,
    paddingHorizontal: 16,
    lineHeight: 20,
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: "600",
    height: 48,
  },
  "input-disabled": {
    color: colors["gray-disabled"],
    borderWidth: 1,
    borderColor: colors["gray-disabled"],
  },
  "input-warning-light": {
    color: colors["warning-light"],
    borderWidth: 1,
    borderColor: colors["warning-light"],
  },
  "input-warning": {
    color: colors.warning,
    borderWidth: 1,
    borderColor: colors.warning,
  },
  "input-default": {
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.black,
  },
};

export const theme = {
  light: {
    appBackgroundColor: "#fff",
    color: "#000",
    spacings,
    typography,
    colors,
    shadows,
    borders,
    badgeColors,
    inputs,
    fontWeights,
  },
  dark: {
    appBackgroundColor: "#000",
    color: "#fff",
    spacings,
    typography,
    fontWeights,
  },
};
