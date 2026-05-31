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
    "font-weight": "700",
    "font-size": 32,
    "line-height": 40,
    "letter-spacing": -0.5,
  },
  "heading-h2": {
    "font-weight": "600",
    "font-size": 24,
    "line-height": 32,
    "letter-spacing": -0.25,
  },
  "heading-h3": {
    "font-weight": "500",
    "font-size": 20,
    "line-height": 28,
    "letter-spacing": -0.15,
  },
  "body-regular": {
    "font-weight": "400",
    "font-size": 16,
    "line-height": 24,
    "letter-spacing": 0,
  },
  "body-small": {
    "font-weight": "400",
    "font-size": 14,
    "line-height": 20,
    "letter-spacing": 0,
  },
  caption: {
    "font-weight": "500",
    "font-size": 12,
    "line-height": 16,
    "letter-spacing": 0.5,
  },
  "button-text": {
    "font-weight": "600",
    "font-size": 14,
    "line-height": 16,
    "letter-spacing": 0.5,
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
  "text-gray-color": "#9E9E9E",
  "gray-light": "#EDEDED",
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
    elevation: 1,
  },
};

const borders = {
  "border-disabled": `1px solid ${colors["gray-disabled"]}`,
  "border-warning-light": `1px solid ${colors["warning-light"]}`,
  "border-warning": `1px solid ${colors.warning}`,
  "border-default": `1px solid ${colors.black}`,
  "border-gray": `1px solid ${colors["gray-light"]}`,
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
