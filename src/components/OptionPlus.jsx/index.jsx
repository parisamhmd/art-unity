import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "./item";
import Button from "../Button";

const OptionPlus = ({
  value,
  errorMessage,
  onChange: handleChange,
  maxItem,
  required = true,
  label,
}) => {
  const classes = useStyle();

  const handleAddItem = () => {
    if (!value || value?.length < maxItem) {
      handleChange([...value, { title: "", image: "", text: "" }]);
    }
  };

  const handleDeleteItem = (deletedIndex) => {
    const newItems = value.filter((Item, index) => index !== deletedIndex);
    handleChange(newItems);
  };

  const handleValueChange = (cardValue, changedIndex) => {
    const changedData = value?.map((item, index) => {
      if (changedIndex === index) return cardValue;
      return item;
    });
    handleChange(changedData);
  };

  return (
    <div className={classes.container}>
      <div className={classes.inputLabel}>
        <p className={classes.label}>{label} </p>
        {required && <p className={classes.requiredMessage}>(الزامی)</p>}
        <div className="h-5 w-20 mr-3">
          <Button
            selected
            isDisabled={value?.length >= maxItem}
            onClick={handleAddItem}
          >
            افزودن
          </Button>
        </div>
      </div>
      <hr className="mb-5" />
      <Grid container wrap="wrap" spacing={3}>
        {value?.map((item, index) => (
          <Grid item lg={4} xs={12}>
            <Card
              errorMessage={errorMessage && errorMessage[index]}
              id={index}
              values={item}
              onChange={handleValueChange}
              handleDeleteItem={handleDeleteItem}
            />
          </Grid>
        ))}
        <Grid item md={4} xs={12}></Grid>
      </Grid>
    </div>
  );
};

export default OptionPlus;
const useStyle = makeStyles((theme) => ({
  inputLabel: {
    color: theme.palette.text.primary,
    margin: "0.5rem 0",
    display: "flex",
    // justifyContent: "flex-start",
    fontFamily: "Vazir",
    direction: "rtl",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    paddingBottom: "1rem",
  },
  requiredMessage: {
    color: theme.palette.secondary.main,
    fontSize: "0.75rem",
    marginRight: "0.5rem",
  },
  label: {
    color: theme.palette.text.primary,
    marginBottom: "0.5rem",
    fontFamily: "Vazir",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
}));
