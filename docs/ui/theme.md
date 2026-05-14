# Theme

The theme system uses `styled-components/native`'s `ThemeProvider`. Design tokens are defined once in `app/theme/theme.js` and injected into every styled-component via the `theme` prop.

## Active Theme

**File:** `app/theme/useTheme.js`

`useTheme()` resolves the current colour scheme and returns `theme.light` or `theme.dark`. Currently only the light theme is fully defined.

```js
const theme = useTheme(); // returns theme.light
```

---

## Token Reference

### Colors — `theme.colors`

| Token | Value | Usage |
|---|---|---|
| `primary` | `#26C867` | Active tab pill, primary accents |
| `white` | `#fff` | Card backgrounds, button text |
| `black` | `#000` | Default text, primary button bg |
| `gray-disabled` | `#B9B9B9` | Disabled inputs and borders |
| `warning` | `#E53935` | Delete buttons, error states |
| `warning-light` | `#EE9A98` | Light warning borders |
| `light-blue` | `#F1FAFF` | Screen background (ScreenWrapper) |
| `active-color` | `#FF4A4A` | Active indicators |
| `inactive-color` | `#666666` | Inactive tab labels |
| `text-gray-color` | `#86868d` | Subtitles, meta text |

### Typography — `theme.typography`

| Token | fontSize | fontWeight | lineHeight | letterSpacing |
|---|---|---|---|---|
| `display-h1` | 32 | 700 | 40 | -0.5 |
| `heading-h2` | 24 | 600 | 32 | -0.25 |
| `heading-h3` | 20 | 500 | 28 | -0.15 |
| `body-regular` | 16 | 400 | 24 | 0 |
| `body-small` | 14 | 400 | 20 | 0 |
| `caption` | 12 | 500 | 16 | 0.5 |
| `button-text` | 14 | 600 | 16 | 0.5 |

Usage in styled-components:
```js
font-size: ${({ theme }) => theme.typography["heading-h2"].fontSize}px;
font-weight: ${({ theme }) => theme.typography["heading-h2"].fontWeight};
```

### Font Weights — `theme.fontWeights`

| Token | Value |
|---|---|
| `default` | `"400"` |
| `medium` | `"500"` |
| `semiBold` | `"600"` |
| `bold` | `"700"` |

### Shadows — `theme.shadows`

React Native shadow objects spread directly into `StyleSheet` styles (or via `styled.View.attrs`).

| Level | Use case |
|---|---|
| `level-1` | Subtle card lift |
| `level-2` | Standard card (summary cards, task main card) |
| `level-3` | Light event item shadow |

### Badge Colors — `theme.badgeColors`

Status badges use a pair of tokens per status: a solid `primary` colour and a `transparent` variant for the background.

| Status | Primary | Transparent |
|---|---|---|
| `assigned` / `completed` | `#0cc657` | `rgba(38, 200, 103, 0.231)` |
| `inactive` / `cancelled` / `declined` / `deleted` | `#d83232` | `rgba(242, 34, 34, 0.294)` |
| `inprogress` / `notstarted` / `pending` | `#edab27` | `rgba(238, 217, 51, 0.3)` |
| `accepted` | `#fff` (text) | `#26C867` (bg) |

Usage in a styled-component:
```js
background-color: ${({ theme, type }) =>
  theme.badgeColors[`badge-${type}-transparent`] || "rgba(0,0,0,0.1)"};
border-color: ${({ theme, type }) =>
  theme.badgeColors[`badge-${type}-primary`] || theme.colors.black};
```

`type` is the `badgeColor` value from the status map (e.g., `"pending"`, `"assigned"`).

### Borders — `theme.borders`

| Token | Description |
|---|---|
| `border-default` | 1px solid black |
| `border-gray` | 1px solid `gray-disabled` |
| `border-disabled` | 1px solid `gray-disabled` |
| `border-warning` | 1px solid `warning` |
| `border-warning-light` | 1px solid `warning-light` |

### Inputs — `theme.inputs`

| Token | Description |
|---|---|
| `base-input` | Default padding, font size, height for all inputs |
| `input-default` | Black text + border |
| `input-disabled` | Gray text + border |
| `input-warning` | Warning red text + border |
| `input-warning-light` | Light warning text + border |

### Spacings — `theme.spacings`

| Token | Value (px) |
|---|---|
| `spacing-1` | 4 |
| `spacing-2` | 8 |
| `spacing-3` | 16 |
| `spacing-4` | 24 |
| `spacing-5` | 32 |
| `spacing-6` | 40 |

---

## Extending the Theme

Add new tokens to `app/theme/theme.js` inside the `light` (and optionally `dark`) object. They become available immediately in any styled-component via the `theme` prop.
