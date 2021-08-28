import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { CircularProgress } from "@material-ui/core";

const PreviewImage = ({ id, isLoading = false, handleChange }) => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <label htmlFor={id}>
        <div className={classes.uploadBox}>
          {isLoading ? (
            <CircularProgress className={classes.addIcon} />
          ) : (
            <AddCircleOutlineIcon className={classes.addIcon} />
          )}
        </div>
      </label>
      <input
        id={id}
        accept="image/*"
        type="file"
        className="hidden"
        onChange={!isLoading && handleChange}
      />
    </div>
  );
};

export default PreviewImage;
const useStyle = makeStyles((theme) => ({
  container: {
    width: "8.125rem",
    height: "9.125rem",
    minWidth: "8.125rem",
  },
  uploadBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: theme.palette.grey[200],
    padding: "0.125rem",
    overflow: "hidden",
  },
  addIcon: {
    width: "3rem",
    height: "3rem",
    color: theme.palette.secondary.main,
  },
}));
