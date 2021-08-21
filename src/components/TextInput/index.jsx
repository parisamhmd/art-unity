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
  isRequired,
  icon,
  onChange,
  className,
  type,
  errorMessage,
  Required,
  label,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div>
      <FormControl fullWidth>
        <div className={classes.inputLabel}>
          {Required && <p className={classes.requiredMessage}>(الزامی)</p>}
          <p>{label} </p>
        </div>
        <FilledInput
          fullWidth
          id={id}
          placeholder={placeholder}
          type={type}
          value={value}
          required={isRequired}
          className={`${classes.loginInput} ${className}`}
          disableUnderline
          startAdornment={
            <InputAdornment position="start">{icon}</InputAdornment>
          }
          onChange={(event) => onChange(event.target.value)}
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
  loginInput: {
    margin: 0,
    marginBottom: "0.5rem",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    fontSize: "1rem",
    "& .MuiFilledInput-input": {
      padding: "10px 15px",
    },
    "&.MuiFilledInput-root": {
      color: theme.palette.grey[300],
      border: `2px solid ${theme.palette.grey[200]}`,
      backgroundColor: theme.palette.background.paper,
    },
    "&.Mui-focused": {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
    "& .MuiInputAdornment-positionStart": {
      margin: "0 0 0 5px",
    },
  },
}));
