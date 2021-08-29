import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SingleDropdown from "../Dropdown/SingleDropdown";
import { useField } from "formik";

const useStyle = makeStyles((theme) => ({
  container: {
    direction: "ltr",
  },
}));

const SingleDropdownField = ({
  options,
  errorMessage,
  required,
  label,
  ...props
}) => {
  const classes = useStyle();
  const [field, { error }, { setValue }] = useField(props);
  return (
    <div className={classes.container}>
      <SingleDropdown
        errorMessage={error}
        required={required}
        label={label}
        options={options}
        onChange={(e) => setValue(e)}
        value={field.value}
        {...props}
      />
    </div>
  );
};

export default SingleDropdownField;
