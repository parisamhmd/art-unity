import React, { useState, useEffect } from "react";
import { makeStyles, InputAdornment, FilledInput } from "@material-ui/core";
import PropType from "prop-types";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  loginInput: {
    "& .MuiFilledInput-input": {
      padding: "10px 15px",
    },
    "&.MuiFilledInput-root": {
      color: "#bdbdbd",
      border: `1px solid ${theme.palette.grey[300]}`,
      backgroundColor: theme.palette.background.paper,
    },
    "&.Mui-focused": {
      boxShadow: "0 3px 3px -1px rgba(0, 0, 0, 0.1)",
    },
    "& .MuiInputAdornment-positionStart": {
      margin: "0 0 0 5px",
    },
  },
}));

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
  ...props
}) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  useEffect(() => {
    setText(value ? value : "");
  }, [value]);
  //   const handleChange = (text) => {
  //     setText(text);
  //     onChange(text);
  //   };
  return (
    <div>
      <FormControl fullWidth>
        <FilledInput
          fullWidth
          id={id}
          placeholder={placeholder}
          type={type}
          value={value}
          required={isRequired}
          className={`${classes.loginInput} ${className}`}
          disableUnderline
          inputProps={{
            className: `${errorMessage ? "border-primary-main" : ""}
             placeholder-text-disabled text-text-primary`,
          }}
          startAdornment={
            <InputAdornment position="start">{icon}</InputAdornment>
          }
          onChange={(event) => onChange(event.target.value)}
          {...props}
        />
        {errorMessage && (
          <p
            className={`
              text-xs
              ml-5
              mt-1
              text-primary-main
              font-medium
          `}
          >
            {errorMessage}
          </p>
        )}
      </FormControl>
    </div>
  );
};

TextInputLogin.propTypes = {
  placeholder: PropType.string,
  id: PropType.string,
  value: PropType.string,
  isRequired: PropType.bool,
  icon: PropType.element.isRequired,
  onChange: PropType.func,
  className: PropType.string,
  type: PropType.string,
  errorMessage: PropType.string,
};

export default TextInputLogin;
