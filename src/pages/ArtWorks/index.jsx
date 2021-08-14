import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const ArtWorksPage = () => {
  const classes = useStyle();

  return <div className={classes.container}> ArtWorks</div>;
};

export default ArtWorksPage;
