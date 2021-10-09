import React from "react";
import {
  makeStyles,
  InputAdornment,
  FilledInput,
  FormControl,
} from "@material-ui/core";

const TextInputLogin = ({
  placeholder,
  id,
  value,
  icon,
  onChange,
  className,
  type,
  errorMessage,
  required,
  label,
  isNumber,
  ...props
}) => {
  const classes = useStyles({ isNumber });
  return (
    <div>
      <FormControl fullWidth>
        <div className={classes.inputLabel}>
          {required && <p className={classes.requiredMessage}>(الزامی)</p>}
          <p>{label} </p>
        </div>
        <FilledInput
          fullWidth
          id={id}
          placeholder={placeholder}
          type={type}
          value={value}
          className={`${classes.loginInput} ${className}`}
          disableUnderline
          //   startAdornment={
          //     <InputAdornment position="start">{icon}</InputAdornment>
          //   }
          onChange={(event) => {
            if (isNumber) /^\d*$/.test(event.target.value) && onChange(event);
            else onChange(event);
          }}
          {...props}
        />
        <div className="flex justify-end">
          <p className={classes.errorMessage}>{errorMessage}</p>
        </div>
      </FormControl>{" "}
    </div>
  );
};

export default TextInputLogin;

const useStyles = makeStyles((theme) => ({
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
  loginInput: ({ isNumber }) => ({
    margin: 0,
    height: "2.75rem",
    marginBottom: "0.5rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    "& .MuiFilledInput-input": {
      padding: "10px 15px",
      textAlign: isNumber ? "left" : "right",
      direction: isNumber ? "ltr" : "rtl",
    },
    "&.MuiFilledInput-root": {
      fontFamily: "Vazir",
      color: theme.palette.text.primary,
      border: `2px solid ${theme.palette.grey[200]}`,
      backgroundColor: theme.palette.background.paper,
    },
    "&.Mui-focused": {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
    "& .MuiInputAdornment-positionStart": {
      margin: "0 0 0 5px",
    },
  }),
}));
