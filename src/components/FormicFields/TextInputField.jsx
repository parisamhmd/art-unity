import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextInput from "../TextInput";
import { useField } from "formik";

const useStyle = makeStyles((theme) => ({
  container: {
    direction: "ltr",
  },
}));

const TextInputField = ({
  placeholder,
  className,
  type,
  required,
  label,
  ...props
}) => {
  const classes = useStyle();
  const [field, { error }] = useField(props);
  return (
    <div className={classes.container}>
      <TextInput
        placeholder={placeholder}
        type={type}
        errorMessage={error}
        required={required}
        label={label}
        {...field}
        {...props}
      />
    </div>
  );
};

export default TextInputField;
