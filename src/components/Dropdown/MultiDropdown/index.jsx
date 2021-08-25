import React, { useEffect, useState } from "react";
import { Grid, Tooltip, Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CustomMultiDropdown from "./CustomMultiDropdown";

const MultiDropdown = ({
  label,
  values,
  options,
  isDisabled,
  errorMessage,
  required,
  maxItem,
  onChange: handleChange,
  style,
  ...props
}) => {
  const classes = useStyle();
  const [selectedOptions, setSelectedOptions] = useState(values || []);

  useEffect(() => {
    if (values) {
      setSelectedOptions(values ? values : []);
    }
  }, [values]);

  const handleOptionClick = (e) => {
    if (e) {
      setSelectedOptions((prev) => {
        const next = [...prev].concat(e);
        handleChange?.(next);
        return next;
      });
    }
  };

  const handleDeleteOption = (element) => {
    setSelectedOptions((prev) => {
      const next = [...prev]?.filter((item) => element.value !== item.value);
      handleChange?.(next);
      return next;
    });
  };

  return (
    <div>
      <CustomMultiDropdown
        label={label}
        options={options}
        isDisabled={selectedOptions.length >= maxItem || isDisabled}
        errorMessage={errorMessage}
        required={required}
        selectedOptions={values ? values : selectedOptions}
        onChange={handleOptionClick}
        style={style}
        {...props}
      />
      <Grid container wrap="wrap" spacing={1} className={classes.elementBox}>
        {values &&
          values?.map((element) => (
            <Grid
              item
              container
              key={element.value}
              justifyContent="space-around"
              alignItems="center"
              className={classes.element}
              xs={3}
            >
              <Grid item xs={9}>
                <Tooltip
                  title={
                    options?.find((item) => item.value === element.value)?.label
                  }
                  placement="top"
                  classes={{ tooltip: "text-3xs" }}
                >
                  <Typography className={classes.elementText} color="secondary">
                    {
                      options?.find((item) => item.value === element.value)
                        ?.label
                    }
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <CloseIcon
                  className="cursor-pointer w-3 h-3"
                  onClick={() => handleDeleteOption(element)}
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
export default MultiDropdown;

const useStyle = makeStyles((theme) => ({
  elementBox: {
    paddingTop: "1rem",
    direction: "rtl",
  },
  element: {
    height: "2.5rem",
    margin: "0 0.5rem 0.5rem",
    borderRadius: "0.5rem",
    background: theme.palette.grey[25],
  },
  elementText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 600,
  },
}));
