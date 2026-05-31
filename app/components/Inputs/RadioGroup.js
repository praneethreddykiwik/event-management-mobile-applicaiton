import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { validationList } from "../../constants/validations.constants";

export const RadioGroup = ({
  label,
  placeholder,
  list = [],
  value,
  onChange,
  name,
  error,
  validations,
}) => {
  const isRequired = validations?.includes(validationList.REQUIRED);
  const heading = label || placeholder;

  const select = (option) => {
    onChange({ target: { name, value: option } });
  };

  return (
    <View style={styles.container}>
      {heading ? (
        <Text style={styles.label}>
          {heading}
          {isRequired ? " *" : ""}
        </Text>
      ) : null}

      <View style={styles.row}>
        {list.map((option) => {
          const selected = value === option;
          return (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => select(option)}
              activeOpacity={0.75}
            >
              <View style={[styles.dot, selected && styles.dotSelected]}>
                {selected ? <View style={styles.dotInner} /> : null}
              </View>
              <Text style={styles.optionLabel}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
    marginBottom: 8,
    marginLeft: 20,
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    paddingHorizontal: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#bdbdbd",
    alignItems: "center",
    justifyContent: "center",
  },
  dotSelected: {
    borderColor: "#26C867",
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#26C867",
  },
  optionLabel: {
    fontSize: 14,
    color: "#000",
  },
  error: {
    color: "#a30000",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 20,
    textAlign: "left",
  },
});

export default RadioGroup;
