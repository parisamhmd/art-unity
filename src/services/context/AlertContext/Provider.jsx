// import {images} from "@constants/images";
// import PrimaryButton from "@elements/Buttons/PrimaryButton";
// import WhiteButton from "@elements/Buttons/WhiteButton";

import { Dialog, Grid, Grow, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { AlertContext } from "./index";

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: 28,
  },
  rootContainerPaper: {
    padding: "1.875rem",
    width: "18.75rem",
  },
  dialogTitle: {
    marginBottom: "2.5rem",
  },
  divider: {
    top: "7.625rem",
  },
  closeIcon: {
    left: "1.875rem",
  },
  title: {
    fontSize: "1.125rem",
    lineHeight: "normal",
    fontWeight: "bolder",
  },
  image: {
    height: "6.25rem",
    marginBottom: "1.25rem",
  },
}));

export default function AlertContextProvider({ children }) {
  const classes = useStyles();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [allowDismiss, setAllowDismiss] = React.useState(true);
  const [text, setText] = React.useState("");
  const [confirmText, setConfirmText] = React.useState("");
  const [refuseText, setRefuseText] = React.useState("");
  const [icon, setIcon] = React.useState("");
  const promptPromise = React.useRef();
  const alertPromise = React.useRef();
  const alertTimeOut = React.useRef();
  React.useEffect(() => {
    if (!alertOpen) {
      if (alertTimeOut.current) {
        clearTimeout(alertTimeOut.current);
      }
      alertTimeOut.current = undefined;
      alertPromise.current = undefined;
      promptPromise.current = undefined;
    }
  }, [alertOpen]);
  const success = React.useCallback(({ text, icon, delay, allowDismiss }) => {
    setText(text);
    setConfirmText("");
    setAllowDismiss(allowDismiss || true);
    setIcon(icon);
    setAlertOpen(true);
    alertTimeOut.current = setTimeout(() => {
      alertPromise.current?.(false);
      setAlertOpen(false);
    }, (delay || 5) * 1000);
    return new Promise()((resolve) => {
      alertPromise.current = resolve;
    });
  }, []);
  const error = React.useCallback(({ text, icon, delay, allowDismiss }) => {
    setText(text);
    setConfirmText("");
    setAllowDismiss(allowDismiss || true);
    setIcon(icon);
    setAlertOpen(true);
    alertTimeOut.current = setTimeout(() => {
      alertPromise.current?.(false);
      setAlertOpen(false);
    }, (delay || 5) * 1000);
    return new Promise()((resolve) => {
      alertPromise.current = resolve;
    });
  }, []);
  const prompt = React.useCallback(
    ({ confirmText, refuseText, text, icon, allowDismiss }) => {
      setText(text);
      setAllowDismiss(allowDismiss || true);
      setAlertOpen(true);
      setConfirmText(confirmText || "بله.");
      setRefuseText(refuseText || "خیر.");
      setIcon(icon);
      return new Promise()((resolve) => {
        promptPromise.current = resolve;
      });
    },
    []
  );
  return (
    <AlertContext.Provider value={{ success, error, prompt }}>
      <Dialog
        open={alertOpen}
        onClose={() => {
          promptPromise.current?.({ result: false, cancelReason: "dismiss" });
          alertPromise.current?.(true);
          setAlertOpen(false);
        }}
        disableBackdropClick={!allowDismiss}
        disableEscapeKeyDown={!allowDismiss}
        TransitionComponent={Grow}
        transitionDuration={400}
        maxWidth={false}
        classes={{
          paper: `bg-white ${classes.rootContainerPaper} rounded-10px relative flex flex-col items-center`,
        }}
        PaperProps={{ elevation: 0 }}
      >
        <img alt="asset" src={icon} className={classes.image} />
        <div
          id="dialog-title"
          className={`${classes.dialogTitle} inline-flex justify-center`}
        >
          <Typography
            color="textPrimary"
            align="center"
            className={classes.title}
          >
            {text}
          </Typography>
        </div>
        <div id="dialog-body" className="w-full">
          {!!confirmText && (
            <Grid container direction="column">
              <Grid item>
                <Button
                  selected
                  fullWidth
                  onClick={() => {
                    promptPromise.current?.({ result: true });
                    setAlertOpen(false);
                  }}
                >
                  {confirmText}
                </Button>
              </Grid>
              <Grid item className="mt-3.5">
                <Button
                  classes={{
                    root: clsx([
                      "border-2 border-solid bg-background-default border-grey-200",
                      classes.button,
                    ]),
                  }}
                  fullWidth
                  onClick={() => {
                    promptPromise.current?.({
                      result: false,
                      cancelReason: "refuse",
                    });
                    setAlertOpen(false);
                  }}
                >
                  {refuseText}
                </Button>
              </Grid>
            </Grid>
          )}
        </div>
      </Dialog>
      {children}
    </AlertContext.Provider>
  );
}
