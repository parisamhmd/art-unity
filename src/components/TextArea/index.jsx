import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
const TextArea = ({ required, label, errorMessage, ...props }) => {
  const classes = useStyle();
  const theme = useTheme();
  return (
    <div className={classes.container}>
      <div className={classes.inputLabel}>
        {required && <p className={classes.requiredMessage}>(الزامی)</p>}
        <p>{label} </p>
      </div>
      <TextareaAutosize
        className={classes.textArea}
        minRows={8}
        maxRow={8}
        {...props}
      />
      <div className="flex justify-end">
        <p className={classes.errorMessage}>{errorMessage}</p>
      </div>
    </div>
  );
};

export default TextArea;

const useStyle = makeStyles((theme) => ({
  container: {},
  inputLabel: {
    color: theme.palette.text.primary,
    margin: "0.5rem 0",
    display: "flex",
    justifyContent: "flex-end",
    fontFamily: "Vazir",
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
  textArea: {
    width: "100%",
    margin: 0,
    height: "2.75rem",
    marginBottom: "0.5rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    padding: "10px 15px",
    textAlign: "right",
    direction: "rtl",
    fontFamily: "Vazir",
    border: `2px solid ${theme.palette.grey[200]}`,
    "&:focus": {
      outline: "none",
      border: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}));
