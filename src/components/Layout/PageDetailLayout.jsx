import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const PageDetailLayout = ({ title }) => {
  const classes = useStyle();
  const history = useHistory();

  return (
    <div className="flex items-center justify-between mb-10 ">
      <Grid container justify="space-between">
        <Grid item>
          <p className={classes.title}>{title}</p>
        </Grid>
        <Grid item>
          <ArrowBackIcon
            className="cursor-pointer"
            onClick={() =>
              history.push(
                history.location.pathname.split("/").slice(0, -1).join("/")
              )
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PageDetailLayout;

const useStyle = makeStyles((theme) => ({
  title: {
    fontFamily: "Vazir",
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "1rem",
    color: theme.palette.secondary.main,
  },
}));
