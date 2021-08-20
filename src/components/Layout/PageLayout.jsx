import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "../Button";

const PageLayout = ({
  addButtonTitle,
  searchInputPlaceholder,
  searchValue: value,
  onSearchInputChange: handleChange,
  children,
}) => {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
        onClick={() => handleClickOpen()}
        className={classes.addButton}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default PageLayout;

const useStyle = makeStyles((theme) => ({
  searchInput: {
    width: "60%",
    // marginLeft: "rem",
    fontFamily: "Vazir",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0.5rem",
    border: `1px solid ${theme.palette.secondary.main}`,
    height: "2.5rem",
    fontSize: "1rem",
    padding: "1rem",
  },
}));
