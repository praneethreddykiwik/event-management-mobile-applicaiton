# Components

All reusable components live in `app/components/`.

---

## Button

**File:** `app/components/Buttons/Button.js`

A multi-variant button that renders the correct styled primitive based on the `type` prop.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `"primary"` | Visual variant (see below) |
| `children` | `ReactNode` | — | Button label text |
| `onClick` | `() => void` | — | Press handler |
| `icon` | `string` | — | Icon variant name |
| `image` | `string` | — | URI for an image inside the button |
| `whiteText` | `boolean` | — | Forces white text colour |
| `disabled` | `boolean` | — | Disables interaction |
| `small` | `boolean` | — | Renders a smaller size |

### Variants

| `type` | Styled Component | Visual |
|---|---|---|
| `"primary"` (default) | `StyledBaseButton` | Filled black |
| `"outlined"` | `StyledOutlinedButton` | Border, transparent bg |
| `"secondary"` | `StyledSecButton` | Secondary fill |
| `"transparent"` | `StyledTransparentButton` | No bg, no border |
| `"no-border"` | `StyledNoBorderButton` | No border |
| `"delete"` | `StyledDeleteBtn` | Warning/red colour |
| `"icon"` | `StyledIconButton` | Icon-only |

### Usage

```jsx
<Button onClick={handleSubmit}>Continue</Button>
<Button type="outlined" onClick={goBack}>Go Back</Button>
<Button type="secondary" onClick={clearHandler}>Clear</Button>
<Button type="delete" onClick={onDelete}>Delete</Button>
```

---

## Inputs

**File:** `app/components/Inputs/Inputs.js`

A dispatcher component that renders the correct input type based on the `type` prop. Used exclusively in forms driven by `createEventInputs` metadata.

### Props (all forwarded to the resolved input)

| Prop | Type | Description |
|---|---|---|
| `type` | `string` | Input type (see below) |
| `name` | `string` | Field identifier |
| `value` | `string` | Controlled value |
| `label` | `string` | Field label |
| `placeholder` | `string` | Placeholder text |
| `error` | `string \| null` | Validation error message |
| `onChange` | `(e) => void` | Change handler — receives `{ target: { name, value } }` |
| `options` | `{ value, label }[]` | Options array for dropdowns |

### Resolved Components

| `type` | Component | File |
|---|---|---|
| `"text"` / `"email"` | `BaseInput` | `Inputs/BaseInput.js` |
| `"number"` | `NumberInput` | `Inputs/NumberInput.js` |
| `"dropdown"` | `Dropdown` | `Inputs/Dropdown.js` |
| `"date"` | `DateInput` | `Inputs/DateInput.js` |
| `"time"` | `TimeInput` | `Inputs/TimeInput.js` |
| `"textarea"` | `TextArea` | `Inputs/TextArea.js` |

---

## CustomTabBar

**File:** `app/components/CustomTabBar/CustomTabBar.component.js`

Animated floating bottom tab bar. See [Navigation docs](navigation.md#custom-tab-bar) for full details.

### Key Behaviours

- Spring-animated green pill tracks the active tab.
- Heavy haptic feedback on every tab press (`triggerHeavyHaptics`).
- Tab width is fixed at 180px for the pill; actual tab item width is determined by `flex: 1`.

---

## ScreenWrapper

**File:** `app/HOC/ScreenWrapper.js`

A higher-order component that wraps every screen in a `SafeAreaView` with the app's background colour (`theme.colors["light-blue"]` = `#F1FAFF`).

```jsx
export const ScreenWrapper = ({ children }) => <Safe>{children}</Safe>;
```

Use it as the outermost element in any screen:

```jsx
return (
  <ScreenWrapper>
    <ScrollView>...</ScrollView>
  </ScreenWrapper>
);
```

---

## VenueSuggestion

**File:** `app/components/Venue/VenueSuggestion.js`

Renders a single venue/event suggestion card with a choose button. Used in the Create/Edit Event screen to pre-fill form fields from sample event metadata.

### Props

| Prop | Type | Description |
|---|---|---|
| `venueDetails` | `object` | Event metadata object from `eventsMetadata` |
| `btnText` | `string` | Label for the action button |
| `onClick` | `() => void` | Called when the button is pressed |

---

## Icons

**File:** `app/components/Icons/Icons.js`

Wraps icon rendering. Pass a `variant` string and optional `color` prop.

```jsx
<Icon variant="task_alt" color="#fff" />
```
