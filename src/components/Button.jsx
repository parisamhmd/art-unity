import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

const useStyle = makeStyles((theme) => ({
  container: {
    background: theme.palette.secondary.main,
    // "#457B9D",
    width: "fit-content",
    fontSize: "15px",
    fontFamily: "Vazir",
    padding: "0.5rem",
    color: theme.palette.background.paper,
    borderRadius: "0.5rem",
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
}));

const CustomButton = ({ onClick, disabled, className, children, ...props }) => {
  const classes = useStyle();

  return (
    <Button
      focusRipple
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `font-semibold focus:outline-none w-full shadow-sm hover:shadow-lg  text-bold text-white ${
          classes.container
        } ${
          disabled ? "bg-grey-option cursor-not-allowed hover:shadow-none" : ""
        } ${className || ""}`
        // backgroundRed ? "bg-primary-main text-sm text-bold text-white" : " ",
        //   backgroundBlue
        //     ? "bg-secondary-main text-xs text-bold text-white"
        //     : " ",
        //   backgroundWhite ? "bg-background-paper text-primary-main" : " ",
        //   borderGreen
        //     ? "bg-transparent hover:bg-secondary-accept text-secondary-accept hover:text-white border-2 border-secondary-accept phover:border-transparent"
        //     : " "
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
