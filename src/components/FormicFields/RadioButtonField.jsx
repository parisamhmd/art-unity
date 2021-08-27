import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useField } from "formik";
import Button from "../Button";

const RadioButtonField = ({ label, ...props }) => {
  const classes = useStyle();
  const [field, { error }, { setValue }] = useField(props);
  React.useEffect(() => {
    setValue(false);
  }, []);
  return (
    <div>
      <div className={classes.inputLabel}>
        <p>{label} </p>
      </div>
      <div className={classes.container}>
        <Button selected={field.value === true} onClick={() => setValue(true)}>
          دارد
        </Button>

        <Button
          selected={field.value === false}
          onClick={() => setValue(false)}
        >
          ندارد
        </Button>
      </div>
    </div>
  );
};

export default RadioButtonField;

const useStyle = makeStyles((theme) => ({
  container: {
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
