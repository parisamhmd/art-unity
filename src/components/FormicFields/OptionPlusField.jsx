import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import OptionPlus from "../OptionPlus.jsx";
import { useField } from "formik";

const useStyle = makeStyles((theme) => ({
  container: {
    direction: "rtl",
  },
}));

const OptionPlusField = ({
  errorMessage,
  required,
  label,
  maxItem,
  ...props
}) => {
  const classes = useStyle();
  const [field, { error }, { setValue }] = useField(props);
  return (
    <div className={classes.container}>
      <OptionPlus
        label={label}
        maxItem={maxItem}
        errorMessage={error}
        required={required}
        {...props}
        value={field.value}
        onChange={(e) => {
          setValue(e);
        }}
      />
    </div>
  );
};

export default OptionPlusField;
