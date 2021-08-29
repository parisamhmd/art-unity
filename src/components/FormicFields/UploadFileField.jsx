import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import UploadInput from "../UploadImage";
import { useField } from "formik";
import axios from "axios";
import { useMutation } from "react-query";

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
  const [loading, setLoading] = React.useState(false);

  const uploadFile = async (data) => {
    const res = await axios.post("/admin/upload?type=art", data);
    return res.data;
  };
  const { mutate: upload } = useMutation(uploadFile, {
    onSuccess: (data) => {
      setValue([...field.value, data.url]);
      setLoading(false);
    },
  });
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
        isLoading={loading}
        onSend={(event) => {
          setLoading(true);
          const data = new FormData();
          data.append("file", event.target.files[0]);
          upload(data);
        }}
        onDelete={(id) => {
          setValue(field.value?.filter((item) => item !== id));
        }}
        {...field}
      />
    </div>
  );
};

export default TextInputField;
