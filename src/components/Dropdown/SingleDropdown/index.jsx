import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "react-select";

const SingleDropdown = ({
  placeholder,
  label,
  options,
  errorMessage,
  required,
  onChange,
  style,
  ...props
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [ShowDropdown, setShowDropdown] = useState(false);
  const Styles = {
    control: (base) => ({
      ...base,
      width: "100%",
      height: "2.75rem",
      fontFamily: "Vazir",
      fontSize: "1rem",
      padding: "0 0.625rem 0",
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0  ${theme.palette.grey[100]}`,
      borderRadius: ShowDropdown ? "0.5rem 0.5rem 0 0" : "0.5rem",
      border: !ShowDropdown
        ? `2px solid ${theme.palette.grey[200]}`
        : `2px solid ${theme.palette.secondary.main}`,
      cursor: "pointer",
      direction: "rtl",
      "&:hover": {
        borderColor: "none",
      },
      ...style,
    }),
    menu: (base) => ({
      ...base,
      width: "100%",
      margin: " 0.15rem 0 0",
      boxShadow: "0",
      paddingBottom: "0.625rem",
      borderRadius: "0 0 5px 5px",
      border: `2px solid ${theme.palette.secondary.main}`,
      backgroundColor: theme.palette.background.paper,
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Vazir",
      fontWeight: "bold",
      fontSize: "1rem",
      color: theme.palette.grey[200],
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        width: "100%",
        fontFamily: "Vazir",
        fontSize: "1rem",
        fontWeight: "bold",
        textAlign: "center",
        padding: "0.9rem",
        outline: "none",
        backgroundColor: theme.palette.background.paper,
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.grey[600],
        cursor: "pointer",
        ":hover": {
          background: theme.palette.background.default,
        },
      };
    },
    menuList: (base) => ({
      ...base,
      padding: 0,
      direction: "ltr",
      "::-webkit-scrollbar": {
        width: "4px",
        overflow: "hidden",
      },
      "::-webkit-scrollbar-track": {
        background: theme.palette.background.default,
      },
      "::-webkit-scrollbar-thumb": {
        background: theme.palette.grey[200],
        borderRadius: "8px",
      },
    }),
    input: (base) => ({
      fontWeight: "bold",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
  };

  return (
    <div className={classes.container}>
      <div className={classes.inputLabel}>
        {required && <p className={classes.requiredMessage}>(الزامی)</p>}
        <p>{label} </p>
      </div>
      <Select
        placeholder={!!placeholder ? placeholder : `${label} را انتخاب کنید`}
        options={options}
        noOptionsMessage={() => "موردی یافت نشد!"}
        onMenuClose={() => setShowDropdown(false)}
        onMenuOpen={() => setShowDropdown(true)}
        components={{ IndicatorSeparator: () => null }}
        captureMenuScroll={false}
        maxMenuHeight={185}
        isClearable
        onChange={(option) => {
          onChange(option);
        }}
        styles={Styles}
        {...props}
        {...style}
        classNamePrefix="react-select"
      />
      <div className="flex justify-end mt-2">
        <p className={classes.errorMessage}>{errorMessage}</p>
      </div>
    </div>
  );
};

export default SingleDropdown;

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: "Vazir",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  inputLabel: {
    color: theme.palette.text.primary,
    margin: "0.5rem 0",
    display: "flex",
    justifyContent: "flex-end",
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
}));
