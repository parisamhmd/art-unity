import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PreviewFile from "./PreviewImage";
import UploadFile from "./UploadInput";

const FileInput = ({
  files,
  onDelete,
  maxItem = 1,
  onSend,
  isLoading,
  required,
  label,
  errorMessage,
}) => {
  const classes = useStyle();

  return (
    <div>
      <div className={classes.inputLabel}>
        {required && <p className={classes.requiredMessage}>(الزامی)</p>}
        <p>{label} </p>
      </div>
      <div className={classes.container}>
        {files &&
          files?.map((file, index) => (
            <div className="ml-2 mt-1">
              <PreviewFile
                alt={`picture${index}`}
                imageURL={file.src}
                onDelete={() => onDelete(file.id)}
              />
            </div>
          ))}
        {files.length < maxItem && (
          <div className="ml-2 mt-1">
            <UploadFile
              id="unique"
              isLoading={isLoading}
              handleChange={(e) => {
                onSend(e);
              }}
            />
          </div>
        )}{" "}
      </div>
      <div className="flex justify-end">
        <p className={classes.errorMessage}>{errorMessage}</p>
      </div>
    </div>
  );
};

export default FileInput;

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    direction: "rtl",
    flexWrap: "wrap",
  },
  inputLabel: {
    color: theme.palette.text.primary,
    margin: "0.5rem 0",
    display: "flex",
    justifyContent: "flex-end",
    fontFamily: "Vazir",
    // direction: "ltr",
    fontWeight: "bold",
  },
  requiredMessage: {
    color: theme.palette.secondary.main,
    fontSize: "0.75rem",
    marginRight: "0.5rem",
  },
  errorMessage: {
    color: theme.palette.secondary.main,
    fontFamily: "Vazir",
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
}));
