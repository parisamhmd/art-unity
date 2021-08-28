import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import UploadInput from "../UploadImage";
import { useField } from "formik";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const TextInputField = ({
  required,
  label,
  maxItem,
  loading = false,
  onUpload,
  ...props
}) => {
  const classes = useStyle();
  const [field, { error }, { setValue }] = useField(props);
  return (
    <div className={classes.container}>
      <UploadInput
        label={label}
        required={required}
        errorMessage={error}
        files={field.value?.map((file) => ({ src: file, id: file }))}
        maxItem={maxItem}
        isLoading={loading}
        onSend={(event) => {
          const data = new FormData();
          data.append("file", event.target.files[0]);
          onUpload(data);
        }}
        onDelete={(id) => {
          setValue(field.value?.filter((item) => item !== id));
        }}
        {...field}
      />{" "}
    </div>
  );
};

export default TextInputField;
