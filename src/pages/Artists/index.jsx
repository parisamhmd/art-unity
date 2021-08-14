import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const ArtistsPage = () => {
  const classes = useStyle();

  return <div className={classes.container}>Artists</div>;
};

export default ArtistsPage;
