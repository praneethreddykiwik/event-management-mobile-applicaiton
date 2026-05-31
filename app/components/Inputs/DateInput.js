import { StyleSheet, Text, View } from "react-native";

import { validationList } from "../../constants/validations.constants";
import logger from "../../utils/logger.utils";
import DTPicker from "../DateTimePicker/DTPicker.component";
import { StyledParagraphSmall } from "../Styled/Typography.styled";
import { isoToInputDateTime } from "../../utils/utils";

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
  // const [focused, setFocused] = useState(false);
  const isRequired = validations?.includes(validationList.REQUIRED);

  // const [date, setDate] = useState(new Date());
  const { date: formattedDate } = isoToInputDateTime(value);

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {isRequired ? " *" : ""}
        </Text>
      ) : null}

      <DTPicker mode="date" value={value} onChange={onChange} name={name}>
        <StyledParagraphSmall>{formattedDate}</StyledParagraphSmall>
      </DTPicker>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 12,
    color: "#86868d",
    marginBottom: 4,
    marginLeft: 20,
    textAlign: "left",
  },
  // input: {
  //   width: "100%",
  //   borderRadius: 30,
  //   height: 40,
  //   paddingHorizontal: 20,
  //   fontSize: 14,
  //   borderWidth: 1,
  //   borderColor: "#e0e0e0",
  //   color: "#000",
  //   backgroundColor: "#fff",
  // },
  // inputFocused: {
  //   borderColor: "#27c14a",
  // },
  // inputError: {
  //   borderColor: "#e53935",
  // },
  error: {
    color: "#a30000",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 20,
    textAlign: "left",
  },
});
