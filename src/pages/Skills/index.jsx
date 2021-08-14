import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {},
}));

const SkillsPage = () => {
  const classes = useStyle();

  return <div className={classes.container}> Skills</div>;
};

export default SkillsPage;
