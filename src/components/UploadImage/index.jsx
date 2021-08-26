import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PreviewFile from "./PreviewImage";
import UploadFile from "./UploadInput";

const FileInput = ({ files, onDelete, maxItem = 5, onSend }) => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      {files?.map((file, index) => (
        <div className="ml-2 mt-1">
          <PreviewFile
            alt={`picture${index}`}
            imageURL={file}
            onDelete={onDelete}
          />
        </div>
      ))}
      {files.length < maxItem && (
        <div className="ml-2 mt-1">
          <UploadFile
            id="unique"
            handleChange={(e) => {
              onSend(e.target.value);
            }}
          />
        </div>
      )}
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
}));
