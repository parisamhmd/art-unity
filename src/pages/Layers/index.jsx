import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const LayersPage = () => {
  const classes = useStyle();

  return <div className={classes.container}> Layers</div>;
};

export default LayersPage;
