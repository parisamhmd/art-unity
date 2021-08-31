import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import Card from "./item";
import Button from "../Button";

const OptionPlus = ({ value, onChange: handleChange, maxItem }) => {
  const classes = useStyle();
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    setItems(value);
  }, [value]);

  useEffect(() => {
    handleChange(items);
  }, [items, handleChange]);

  const addNewItem = () => {
    if (items?.length <= maxItem) {
      setItems((prevItems) => [
        ...prevItems,
        { title: "", image: "", text: "" },
      ]);
    }
  };

  const handleDeleteItem = (deletedIndex) => {
    const newItems = items.filter((Item, index) => index !== deletedIndex);
    setItems(newItems);
  };

  const handleValueChange = (value, changedIndex) => {
    const changedData = items.map((item, index) => {
      if (changedIndex === index) return value;
      return item;
    });
    setItems(changedData);
    // setItems([...items, { ...changedData, ...value }]); ///***************************         */
    handleChange(items);
  };

  return (
    <div className={classes.container}>
      {" "}
      <div className="flex wrap">
        {items?.map((item, index) => (
          <Card
            id={index}
            values={item}
            onChange={handleValueChange}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
      <div>
        <Button
          selected
          isDisabled={items?.length >= maxItem}
          onClick={addNewItem}
        >
          Add new Item
        </Button>
      </div>
    </div>
  );
};

export default OptionPlus;
const useStyle = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.primary,
    marginBottom: "0.5rem",
    direction: "rtl",
    fontFamily: "Vazir",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
}));
