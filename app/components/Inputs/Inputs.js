import Dropdown from "./Dropdown";
import { BaseInput } from "./BaseInput";
import { NumberInput } from "./NumberInput";
import { DateInput } from "./DateInput";
import { TextArea } from "./TextArea";
import { TimeInput } from "./TimeInput";

export const Inputs = (props) => {
  const { type } = props;

  switch (type) {
    case "text":
      return <BaseInput {...props} />;

    case "email":
      return <BaseInput {...props} />;

    case "number":
      return <NumberInput {...props} />;

    case "dropdown":
      return <Dropdown {...props} />;

    case "date":
      return <DateInput {...props} />;

    case "time":
      return <TimeInput {...props} />;

    case "textarea":
      return <TextArea {...props} />;

    default:
      return null;
  }
};
