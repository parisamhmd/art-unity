import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Grid } from "@material-ui/core";
import Button from "../Button";

const PageListLayout = ({
  addButtonTitle,
  searchInputPlaceholder,
  searchValue: value,
  onSearchInputChange: handleChange,
  onAddButtonClick: handleClick,
}) => {
  const classes = useStyle();

  return (
    <div className="flex items-center justify-between mb-10 ">
      <Grid container justify="space-between">
        <Grid item xs={8}>
          <InputBase
            className={classes.searchInput}
            value={value}
            placeholder={searchInputPlaceholder}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button children={addButtonTitle} onClick={() => handleClick()} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PageListLayout;

const useStyle = makeStyles((theme) => ({
  searchInput: {
    width: "60%",
    fontFamily: "Vazir",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0.5rem",
    border: `1px solid ${theme.palette.secondary.main}`,
    height: "2.5rem",
    fontSize: "1rem",
    padding: "1rem",
  },
}));
