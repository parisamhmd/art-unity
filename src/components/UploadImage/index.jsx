import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import SecondaryButton from "components/button/SecondaryButton";
import Button from "../Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

// import { images } from "services/constants/images";
const useStyle = makeStyles((theme) => ({
  container: {
    width: "9.375rem",
    height: "9.375rem",
    padding: "0.625rem",
    borderRadius: "4px",
    backgroundColor: theme.palette.background.paper,
  },
  posterBox: {
    height: "4.563rem",
    overflow: "hidden",
    borderRadius: "2px",
    position: "relative",
    "&:hover div": {
      display: "flex",
    },
  },
  poster: {
    maxWidth: "100%",
  },
  submitButton: {
    fontSize: ".75rem",
    fontWeight: "bold",
    color: "#fff",
    height: "2.5rem",
  },
  delete: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 64, 64, 0.75)",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "none",
  },
  deleteIcon: {
    backgroundColor: "#fff8f8",
    borderRadius: "50%",
    cursor: "pointer",
  },
}));
// interface UploadedFilePreviewProps {
//   disableUploadButton?: boolean;
//   disableDeleteButton?: boolean;
//   loading?: boolean;
//   loadingPercentage?: number;
//   onDelete?: () => void;
//   onSend: (file: File) => Promise<any> | void;
//   file: File | string | undefined;
//   fileType: "image" | "video";
// }
export const UploadedFilePreview = ({
  disableUploadButton,
  disableDeleteButton,
  loading,
  loadingPercentage,
  onSend,
  onDelete: handleDelete,
  //   file,
  fileType,
}) => {
  const styles = useStyle();
  const [file, setFile] = React.useState();
  return (
    <div className={`${styles.container} flex flex-col justify-between`}>
      <div className={styles.posterBox}>
        {file && (
          <img
            className={styles.poster}
            src={
              fileType === "image" && typeof file === "string"
                ? file
                : fileType === "image" && typeof file !== "string"
                ? URL.createObjectURL(file)
                : null
              // images.assets.video
            }
            alt=""
          />
        )}
        {!disableDeleteButton && (
          <div className={styles.delete}>
            <DeleteOutlineIcon
              className="cursor-pointer"
              onClick={handleDelete}
            />
            {/* <img
              onClick={handleDelete}
              className={styles.deleteIcon}
              src={images.icons.close}
              alt="icon"
            /> */}
          </div>
        )}
      </div>
      <Button
        selected
        fullWidth
        // disabled={disableUploadButton || loading}
        className={styles.submitButton}
        // loading={loading}
        // loadingPercentage={loadingPercentage}
        onClick={
          () => typeof file !== "string" && setFile(file)
          // onSend(file)
        }
      >
        بارگذاری
      </Button>
    </div>
  );
};
export default UploadedFilePreview;
