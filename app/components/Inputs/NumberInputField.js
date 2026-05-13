import { View, Text, TextInput, StyleSheet } from "react-native";

const NumberInputField = ({
  label,
  value,
  placeholder,
  onChange,
  name,
  error,
  required,
}) => {
  const handleChange = (text) => {
    onChange({ target: { name, value: text } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required ? " *" : ""}
      </Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={String(value)}
        placeholder={placeholder}
        onChangeText={handleChange}
        placeholderTextColor="#B9B9B9"
        keyboardType="numeric"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#000",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#E53935",
  },
  error: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 4,
  },
});

export default NumberInputField;
