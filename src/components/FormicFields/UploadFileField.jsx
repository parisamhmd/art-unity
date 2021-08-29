import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import UploadInput from "../UploadImage";
import { useField } from "formik";

const useStyle = makeStyles((theme) => ({
  container: {
    direction: "ltr",
  },
}));

const TextInputField = ({
  required,
  label,
  maxItem,
  isLoading,
  onUpload,
  onDelete: handleDelete,
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
        files={
          field.value
            ? field.value?.map((file) => ({ src: file, id: file }))
            : []
        }
        maxItem={maxItem}
        isLoading={isLoading}
        onSend={(event) => {
          const data = new FormData();
          data.append("file", event.target.files[0]);
          onUpload(data);
        }}
        onDelete={(id) => {
          setValue(field.value?.filter((item) => item !== id));
          handleDelete(id);
        }}
        {...field}
      />{" "}
    </div>
  );
};

export default TextInputField;
