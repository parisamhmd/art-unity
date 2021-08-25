import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useAlert } from "../../services/context/AlertContext";
const PreviewImage = ({ imageURL, alt, onDelete: handleDelete }) => {
  const classes = useStyle();
  const alert = useAlert();

  return (
    <div className={classes.container}>
      <div className={classes.imageBox}>
        <Avatar
          src={imageURL}
          alt={alt}
          variant="rounded"
          className={classes.image}
        />
      </div>
      <div className={classes.deleteBox}>
        <DeleteOutlineIcon
          className={classes.deleteIcon}
          onClick={() =>
            alert
              .prompt({
                confirmText: "بله، حذف",
                refuseText: "خیر",
                text: "آیا از حذف این تصویر اطمینان دارید؟",
              })
              .then(({ result }) => {
                result && handleDelete();
              })
          }
        />
      </div>
    </div>
  );
};

export default PreviewImage;
const useStyle = makeStyles((theme) => ({
  container: {
    width: "8.125rem",
    height: "9.125rem",
    position: "relative",
    "&:hover div": {
      display: "flex",
    },
  },
  imageBox: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.grey[200],
    padding: "0.125rem",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  deleteBox: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000,
    display: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    width: "3rem",
    height: "3rem",
    cursor: "pointer",
    padding: "0.375rem",
    background: "rgba(217,217,217,0.7)",
    borderRadius: "50%",
  },
}));
