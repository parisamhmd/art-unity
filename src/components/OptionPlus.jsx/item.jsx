import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import UploadInput from "../UploadImage";
import axios from "axios";
import { useMutation } from "react-query";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useAlert } from "../../services/context/AlertContext/index";

const Item = ({ id, values, onChange: handleChange, handleDeleteItem }) => {
  const classes = useStyle();
  const alert = useAlert();

  const uploadFile = async (data) => {
    const res = await axios.post("/admin/upload?type=art", data);
    return res.data;
  };
  const { mutate: upload, isLoading } = useMutation(uploadFile, {
    onSuccess: (data) => {
      handleChange({ ...values, image: data.url }, id);
    },
  });

  return (
    <div className={classes.container}>
      <div className={classes.formBox}>
        <TextInput
          type="text"
          label="عنوان"
          onChange={(e) =>
            handleChange({ ...values, title: e?.target.value }, id)
          }
        />
        <UploadInput
          id={id}
          label="تصویر"
          files={
            values.image ? [{ src: values?.image, id: values?.image }] : []
          }
          maxItem={1}
          isLoading={isLoading}
          onSend={(event) => {
            const data = new FormData();
            data.append("file", event.target.files[0]);
            upload(data);
          }}
          onDelete={() => {
            handleChange({ values, image: undefined }, id);
          }}
        />
        <div className="mt-5">
          <TextArea
            label="متن"
            required
            onChange={(e) =>
              handleChange({ ...values, text: e?.target.value }, id)
            }
          />{" "}
        </div>
        <div className={classes.deleteIconBox}>
          <DeleteOutlineIcon
            className={classes.deleteIcon}
            onClick={() =>
              alert
                .prompt({
                  confirmText: "بله، حذف",
                  refuseText: "خیر",
                  text: "آیا از حذف این ایتم اطمینان دارید؟",
                })
                .then(({ result }) => {
                  result && handleDeleteItem(id);
                })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Item;

const useStyle = makeStyles((theme) => ({
  container: {
    minWidth: "22rem",
    direction: "ltr",
    border: `2px solid ${theme.palette.grey[200]}`,
    borderRadius: "0.5rem",
    padding: "1.5rem 1.5rem 0 1.5rem",
  },
  formBox: {
    width: "100%",
  },
  deleteIconBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    width: "2.6rem",
    height: "2.6rem",
    cursor: "pointer",
    padding: "0.375rem",
    borderRadius: "50%",
    "&:hover": {
      background: "rgba(217,217,217,0.7)",
    },
  },
}));
