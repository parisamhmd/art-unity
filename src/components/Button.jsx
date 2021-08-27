import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const CustomButton = ({
  onClick,
  disabled,
  selected = true,
  className,
  children,
  ...props
}) => {
  const classes = useStyle({ disabled, selected });

  return (
    <Button
      focusRipple
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `font-semibold focus:outline-none w-full shadow-sm hover:shadow-lg  text-bold text-white ${
          classes.container
        }  ${className || ""}`
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

const useStyle = makeStyles((theme) => ({
  container: ({ disabled, selected }) => ({
    background: !disabled
      ? selected
        ? theme.palette.secondary.main
        : theme.palette.background.paper
      : theme.palette.grey[25],
    color: !disabled
      ? selected
        ? theme.palette.background.paper
        : theme.palette.secondary.main
      : theme.palette.grey[50],
    border: `2px solid ${theme.palette.secondary.main}`,
    width: "100%",
    fontSize: "15px",
    fontWeight: "bold",
    fontFamily: "Vazir",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    "&:hover": {
      background: selected
        ? theme.palette.secondary.main
        : theme.palette.background.paper,
    },
  }),
}));
