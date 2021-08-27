import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextArea from "../TextArea";
import { useField } from "formik";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const TextAreaField = ({ errorMessage, required, label, ...props }) => {
  const classes = useStyle();
  const [field, { error }] = useField(props);
  return (
    <div className={classes.container}>
      <TextArea
        errorMessage={error}
        required={required}
        label={label}
        {...field}
      />
    </div>
  );
};

export default TextAreaField;
