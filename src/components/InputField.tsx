import TextField, { TextFieldProps } from "@mui/material/TextField";

interface Props extends Omit<TextFieldProps, "variant"> {}

const InputField = (props: Props) => {
  return (
    <TextField
      className="Input-field"
      label="Outlined"
      variant="outlined"
      {...props}
    />
  );
};

export default InputField;
