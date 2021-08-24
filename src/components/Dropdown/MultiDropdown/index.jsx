import React, {useEffect, useState} from "react";
import {Grid, Tooltip, Typography} from "@material-ui/core";
import {images} from "services/constants/images";
import CustomMultiDropdown from "./customMutiDropdown";

export type IMultiDropdownProps<T extends number | string> = {
  label?: string;
  hint?: string;
  placeholder?: string;
  defaultValues?: Array<IDropdownOption<T>>;
  values?: Array<IDropdownOption<T>>;
  options?: Array<IDropdownOption<T>>;
  isDisabled?: boolean;
  isError?: boolean;
  required?: boolean;
  maxItem: number;
  onChange?: (selectedOption: Array<IDropdownOption<T>>) => void;
  style?: any;
  errorMessage?: string;
};

export interface IDropdownOption<T> {
  value: T;
  label: string;
  [key: string]: any;
}
function MultiDropdown<T extends number | string = number | string>({
  label,
  hint,
  placeholder,
  defaultValues,
  values,
  options,
  isDisabled,
  isError,
  errorMessage,
  required,
  maxItem,
  onChange: handleChange,
  style,
}: IMultiDropdownProps<T>) {
  const [selectedOptions, setSelectedOptions] = useState<Array<IDropdownOption<T>>>(defaultValues || []);
  useEffect(() => {
    if (values || defaultValues) {
      setSelectedOptions(values ? values : defaultValues ? defaultValues : []);
    }
  }, [values, defaultValues]);

  const handleOptionClick = (e: IDropdownOption<T> | undefined) => {
    if (e) {
      setSelectedOptions((prev) => {
        const next = [...prev].concat(e);
        handleChange?.(next);
        return next;
      });
    }
  };

  const handleDeleteOption = (element: IDropdownOption<T>) => {
    setSelectedOptions((prev) => {
      const next = [...prev]?.filter((item) => element.value !== item.value);
      handleChange?.(next);
      return next;
    });
  };

  return (
    <>
      <CustomMultiDropdown
        label={label}
        hint={hint}
        placeholder={placeholder ? placeholder : "هینت ..."}
        options={options}
        isDisabled={selectedOptions.length >= maxItem || isDisabled}
        isError={isError}
        required={required}
        selectedOptions={values ? values : selectedOptions}
        onInputChange={handleOptionClick}
        style={style}
      />
      {errorMessage && (
        <Grid item className="mt-1">
          <Typography color="error" className="font-medium text-3">
            {errorMessage}
          </Typography>
        </Grid>
      )}
      <Grid className=" pt-3" container wrap="wrap" spacing={1}>
        {!values
          ? selectedOptions &&
            selectedOptions.map((element) => (
              <Grid
                item
                container
                key={element.value}
                alignItems="center"
                className="rounded-2 h-10 ml-2.5 mb-2 px-2.5 bg-Secondary  bg-opacity-4"
                xs={5}
              >
                <Grid item xs={10}>
                  <Tooltip
                    title={options?.find((item) => item.value === element.value)?.label as string}
                    placement="bottom"
                    classes={{tooltip: "text-xs "}}
                  >
                    <Typography
                      className="text-3 overflow-hidden overflow-ellipsis whitespace-nowrap font-bold"
                      color="secondary"
                    >
                      {options?.find((item) => item.value === element.value)?.label}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <img
                    src={images.icons.close}
                    className="cursor-pointer w-4 h-4"
                    alt="closeIcon"
                    onClick={() => handleDeleteOption(element)}
                  />
                </Grid>
              </Grid>
            ))
          : values.map((element) => (
              <Grid
                item
                container
                key={element.value}
                alignItems="center"
                className="rounded-2 h-10 ml-2.5 mb-2 px-2.5 bg-Secondary bg-opacity-4"
                xs={5}
              >
                <Grid item xs={10}>
                  <Tooltip
                    title={options?.find((item) => item.value === element.value)?.label as string}
                    placement="bottom"
                    classes={{tooltip: "text-xs "}}
                  >
                    <Typography
                      className="text-3 text overflow-hidden overflow-ellipsis whitespace-nowrap font-bold text-center"
                      color="secondary"
                    >
                      {options?.find((item) => item.value === element.value)?.label}
                    </Typography>
                  </Tooltip>
                </Grid>
                <Grid item xs={2}>
                  <img
                    src={images.icons.close}
                    className="cursor-pointer w-4 h-4"
                    alt="closeIcon"
                    onClick={() => handleDeleteOption(element)}
                  />
                </Grid>
              </Grid>
            ))}
      </Grid>
    </>
  );
}
export default MultiDropdown;
