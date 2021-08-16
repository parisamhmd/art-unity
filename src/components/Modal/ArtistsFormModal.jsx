import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    height: "5rem",
    backgroundColor: "pink",
  },
}));

const ArtistsFormModal = () => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <input value="Test" />
    </div>
  );
};

export default ArtistsFormModal;
