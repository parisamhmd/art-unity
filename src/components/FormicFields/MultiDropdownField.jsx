import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MultiDropdown from "../Dropdown/MultiDropdown/index";
import { useField } from "formik";

const useStyle = makeStyles((theme) => ({
  container: {
    direction: "ltr",
  },
}));

const MultiDropdownField = ({
  options,
  errorMessage,
  required,
  label,
  ...props
}) => {
  const classes = useStyle();
  const [{ value }, { error }, { setValue }] = useField(props);
  return (
    <div className={classes.container}>
      <MultiDropdown
        errorMessage={error}
        required={required}
        label={label}
        values={value}
        options={options}
        onChange={(e) => setValue(e)}
        {...props}
      />
    </div>
  );
};

export default MultiDropdownField;
