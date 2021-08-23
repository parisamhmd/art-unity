import { useState, useRef, useEffect, useCallback } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Dialog, Grid, Typography } from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "../../../components/Button";
import { AlertContext } from "./index";

export default function AlertContextProvider({ children }) {
  const classes = useStyles();
  const theme = useTheme();

  //   States
  const [alertOpen, setAlertOpen] = useState(false);
  const [allowDismiss, setAllowDismiss] = useState(true);

  const [text, setText] = useState("");
  const [icon, setIcon] = useState("confirm");

  const [confirmText, setConfirmText] = useState("");
  const [refuseText, setRefuseText] = useState("");

  const promptPromise = useRef();
  const alertPromise = useRef();
  const alertTimeOut = useRef();

  useEffect(() => {
    if (!alertOpen) {
      if (alertTimeOut?.current) {
        clearTimeout(alertTimeOut.current);
      }

      alertTimeOut.current = undefined;
      alertPromise.current = undefined;
      promptPromise.current = undefined;
    }
  }, [alertOpen]);

  const success = useCallback(({ text, delay, allowDismiss }) => {
    setText(text);
    setConfirmText("");
    setAllowDismiss(allowDismiss || true);
    setIcon("success");
    setAlertOpen(true);

    alertTimeOut.current = setTimeout(() => {
      alertPromise.current?.(false);
      setAlertOpen(false);
    }, 3000);
    return new Promise()((resolve) => {
      alertPromise.current = resolve;
    });
  }, []);

  const error = useCallback(({ text, allowDismiss }) => {
    setText(text);
    setConfirmText("");
    setAllowDismiss(allowDismiss || true);
    setIcon("error");
    setAlertOpen(true);

    alertTimeOut.current = setTimeout(() => {
      alertPromise.current?.(false);
      setAlertOpen(false);
    }, 3000);

    return new Promise()((resolve) => {
      alertPromise.current = resolve;
    });
  }, []);

  const prompt = useCallback(
    ({ confirmText, refuseText, text, allowDismiss }) => {
      setText(text);
      setIcon("confirm");
      setAlertOpen(true);
      setAllowDismiss(allowDismiss || true);
      setConfirmText(confirmText || "بله.");
      setRefuseText(refuseText || "خیر.");

      return new Promise((resolve) => {
        promptPromise.current = resolve;
      });
    },
    []
  );

  let relatedIcon = (
    <ErrorOutlineIcon
      style={{
        width: "10rem",
        height: "10rem",
        color: theme.palette.secondary.main,
      }}
    />
  );
  if (icon === "success") {
    relatedIcon = (
      <CheckCircleOutline
        style={{
          width: "10rem",
          height: "10rem",
          color: theme.palette.secondary.main,
        }}
      />
    );
  }
  if (icon === "error") {
    relatedIcon = (
      <ClearIcon
        style={{
          width: "10rem",
          height: "10rem",
          color: theme.palette.secondary.main,
        }}
      />
    );
  }

  return (
    <AlertContext.Provider value={{ success, error, prompt }}>
      <Dialog
        open={alertOpen}
        onClose={() => {
          alertPromise.current?.(true);
          promptPromise.current?.({ result: false, cancelReason: "dismiss" });
          setAlertOpen(false);
        }}
        disableBackdropClick={!allowDismiss}
        disableEscapeKeyDown={!allowDismiss}
        PaperProps={{ elevation: 0 }}
        classes={{
          paper: ` ${classes.container} relative `,
        }}
      >
        {relatedIcon}
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
              <Grid item className={classes.buttonContainer}>
                <Button
                  selected={false}
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

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    borderRadius: 28,
    marginTop: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.grey[25],
    borderRadius: "0.5rem",
    padding: "1.75rem",
    width: "20rem",
  },
  dialogTitle: {
    margin: "1rem  0 2.5rem 0",
  },
  title: {
    fontFamily: "Vazir",
    fontSize: "1.125rem",
    lineHeight: "normal",
    fontWeight: "bold",
  },
}));
