import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { validationList } from "../../constants/validations.constants";

export const DateInput = ({
  label,
  value,
  placeholder,
  onChange,
  name,
  error,
  validations,
  disabled,
}) => {
  const [focused, setFocused] = useState(false);
  const isRequired = validations?.includes(validationList.REQUIRED);

  const handleChange = (text) => {
    onChange({ target: { name, value: text } });
  };

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {isRequired ? " *" : ""}
        </Text>
      ) : null}
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
        value={value}
        placeholder={placeholder || "YYYY-MM-DD"}
        onChangeText={handleChange}
        placeholderTextColor="#bdbdbd"
        keyboardType="numeric"
        maxLength={10}
        editable={!disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 12,
    color: "#86868d",
    marginBottom: 4,
    marginLeft: 20,
    textAlign: "left",
  },
  input: {
    width: "100%",
    borderRadius: 30,
    height: 40,
    paddingHorizontal: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#000",
    backgroundColor: "#fff",
  },
  inputFocused: {
    borderColor: "#27c14a",
  },
  inputError: {
    borderColor: "#e53935",
  },
  error: {
    color: "#a30000",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 20,
    textAlign: "left",
  },
});
