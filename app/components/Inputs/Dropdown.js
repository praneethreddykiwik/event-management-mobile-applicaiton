import { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { validationList } from "../../constants/validations.constants";

const Dropdown = ({
  label,
  value,
  placeholder,
  options = [],
  onChange,
  name,
  error,
  validations,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const isRequired = validations?.includes(validationList.REQUIRED);

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label,
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option.value } });
    setOpen(false);
    setSearch("");
  };

  const handleClose = () => {
    setOpen(false);
    setSearch("");
  };

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {isRequired ? " *" : ""}
        </Text>
      ) : null}

      <TouchableOpacity
        style={[styles.control, error && styles.controlError]}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {selectedLabel || placeholder || "Select..."}
        </Text>
        <Text style={styles.arrow}>▾</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={styles.sheet}>
          {/* Sheet header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Search input */}
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Search..."
              placeholderTextColor="#bdbdbd"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Options list */}
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const isSelected = item.value === value;
              return (
                <TouchableOpacity
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No results found</Text>
            }
          />
        </View>
      </Modal>
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
  control: {
    width: "100%",
    borderRadius: 25,
    height: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  controlError: {
    borderColor: "#e53935",
  },
  valueText: {
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  placeholderText: {
    color: "#bdbdbd",
  },
  arrow: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  error: {
    color: "#a30000",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 20,
    textAlign: "left",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: "65%",
    paddingBottom: 30,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
  closeBtn: {
    fontSize: 18,
    color: "#666",
    padding: 4,
  },
  searchWrapper: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  searchInput: {
    borderRadius: 30,
    height: 36,
    paddingHorizontal: 16,
    fontSize: 13,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#000",
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#e6e6e6",
    marginHorizontal: 12,
    borderRadius: 22,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 28,
    marginVertical: 2,
    backgroundColor: "transparent",
  },
  optionSelected: {
    backgroundColor: "#26C867",
  },
  optionText: {
    fontSize: 14,
    color: "#000",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "#86868d",
    fontSize: 14,
    paddingVertical: 20,
  },
});

export default Dropdown;
