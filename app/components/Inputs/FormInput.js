import TextInputField from "./TextInputField";
import TextAreaField from "./TextAreaField";
import NumberInputField from "./NumberInputField";
import DateInputField from "./DateInputField";
import TimeInputField from "./TimeInputField";
import DropdownField from "./DropdownField";

const FormInput = (props) => {
  const { type } = props;

  switch (type) {
    case "text":
      return <TextInputField {...props} />;
    case "email":
      return <TextInputField {...props} />;
    case "number":
      return <NumberInputField {...props} />;
    case "textarea":
      return <TextAreaField {...props} />;
    case "date":
      return <DateInputField {...props} />;
    case "time":
      return <TimeInputField {...props} />;
    case "dropdown":
      return <DropdownField {...props} />;
    default:
      return null;
  }
};

export default FormInput;
