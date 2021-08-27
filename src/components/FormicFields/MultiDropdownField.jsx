import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MultiDropdown from "../Dropdown/MultiDropdown/index";
import { useField } from "formik";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const MultiDropdownField = ({
  options,
  errorMessage,
  required,
  label,
  ...props
}) => {
  const classes = useStyle();
  const [field, { error }] = useField(props);
  return (
    <div className={classes.container}>
      <MultiDropdown
        errorMessage={error}
        required={required}
        label={label}
        values={options?.find((e) => e.value === field.value)}
        {...field}
      />
    </div>
  );
};

export default MultiDropdownField;
