import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useField } from "formik";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import UploadInput from "../UploadImage";
import axios from "axios";
import { useMutation } from "react-query";

const CustomField = ({ label, ...props }) => {
  const classes = useStyle();
  const [field, { error }, { setValue }] = useField(props);

  const uploadFile = async (data) => {
    const res = await axios.post("/admin/upload?type=art", data);
    return res.data;
  };
  const { mutate: upload, isLoading } = useMutation(uploadFile, {
    onSuccess: (data) => {
      setValue({ ...field.value, image: data.url });
    },
  });

  return (
    <div className={classes.container}>
      <div className={classes.label}>
        <p className="mb-2">{label} </p>
        <hr />
      </div>
      <TextInput
        type="text"
        errorMessage={error?.url}
        required
        label="آدرس"
        onChange={(e) => setValue({ ...field.value, url: e?.target.value })}
      />
      <div>
        <UploadInput
          id={field.name}
          label="تصویر"
          required
          errorMessage={error?.image}
          files={
            field.value.image
              ? [{ src: field.value?.image, id: field.value?.image }]
              : []
          }
          maxItem={1}
          isLoading={isLoading}
          onSend={(event) => {
            const data = new FormData();
            data.append("file", event.target.files[0]);
            upload(data);
          }}
          onDelete={(id) => {
            setValue({ ...field.value, image: undefined });
          }}
          {...field}
        />
      </div>
      <div className="mt-5">
        <TextArea
          errorMessage={error?.text}
          label="متن"
          required
          onChange={(e) => setValue({ ...field.value, text: e?.target.value })}
        />{" "}
      </div>
    </div>
  );
};

export default CustomField;

const useStyle = makeStyles((theme) => ({
  container: {
    direction: "ltr",
    border: `2px solid ${theme.palette.grey[200]}`,
    borderRadius: "0.5rem",
    padding: "1.5rem",
  },
  label: {
    color: theme.palette.text.primary,
    marginBottom: "0.5rem",
    direction: "rtl",
    fontFamily: "Vazir",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  box: {
    width: "100%",
    display: "flex",
    gap: 3,
    padding: "0.25rem",
    direction: "rtl",
  },
  inputLabel: {
    color: theme.palette.text.primary,
    margin: "0.5rem 0",
    display: "flex",
    justifyContent: "flex-end",
    fontFamily: "Vazir",
    fontWeight: "bold",
  },
}));
