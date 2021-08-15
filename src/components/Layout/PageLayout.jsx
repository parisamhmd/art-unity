import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, InputBase } from "@material-ui/core";

const PageLayout = ({
  onAdd: handleClick,
  addButtonTitle,
  searchInputPlaceholder,
  searchValue: value,
  onSearchInputChange: handleChange,
}) => {
  const classes = useStyle();

  return (
    <div className="flex items-center justify-between mb-10 ">
      <InputBase
        className={classes.searchInput}
        value={value}
        placeholder={searchInputPlaceholder}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button
        children={addButtonTitle}
        onClick={() => handleClick()}
        className={classes.addButton}
      />
    </div>
  );
};

export default PageLayout;

const useStyle = makeStyles((theme) => ({
  searchInput: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0.5rem",
    border: `2px solid ${theme.palette.secondary.dark}`,
    height: "3rem",
    fontSize: "1rem",
    padding: "1rem",
  },
  addButton: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: "0.5rem",
    color: theme.palette.background.paper,
    height: "3rem",
    fontSize: "1.125rem",
    fontWeight: "bold",
    padding: "1rem",
  },
}));
