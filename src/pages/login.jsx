import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const LoginPage = () => {
  const classes = useStyle();

  return <div className={classes.container}></div>;
};

export default LoginPage;
