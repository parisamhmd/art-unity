import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { images } from "@constants/images";
import Select, { components, Styles } from "react-select";
import clsx from "clsx";
const useStyle = makeStyles((theme) => ({
  container: {},
  label: ({ hint }: { hint: string | undefined }) => ({
    fontSize: "0.875rem",
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: hint ? "0.25rem" : "0.625rem",
  }),
  hint: {
    fontWeight: 500,
    fontSize: "0.75rem",
    textAlign: "left",
    color: theme.palette.text.disabled,
    marginBottom: "0.625rem",
  },
  requiredMessage: {
    fontSize: "0.75rem",
    color: theme.palette.secondary.main,
  },
}));

export interface ICustomMultiDropdownProps<T> {
  label?: string;
  hint?: string;
  placeholder?: string;
  selectedOptions?: Array<IOption<T>>;
  options?: Array<IOption<T>>;
  disabledOptions?: Array<IOption<T>>;
  isDisabled?: boolean;
  isError?: boolean;
  required?: boolean;
  onInputChange: (e: IOption<T> | undefined) => void;
  style?: any;
}

interface IOption<T> {
  value: T;
  label: string;
  [key: string]: any;
}
const CustomMultiDropdown: React.FC<
  ICustomMultiDropdownProps<number | string>
> = ({
  label,
  hint,
  placeholder,
  options,
  selectedOptions,
  isDisabled,
  isError,
  required,
  onInputChange,
  style,
}) => {
  const [ShowDropdown, setShowDropdown] = useState < boolean > false;
  const [selectedItems, setSelectedItems] =
    (useState < Array < IOption < string) | (number >>> []);
  const classes = useStyle({ hint });
  const theme = useTheme();
  const Styles: Partial<Styles<IOption<string | number>, false>> = {
    control: (base: any) => ({
      ...base,
      fontSize: "0.875rem",
      width: "100%",
      height: "3.5rem",
      padding: "0 1.125rem 0",
      cursor: "pointer",
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0  ${theme.palette.grey[300]}`,
      borderRadius: ShowDropdown ? "10px 0 0 0" : "10px 0 10px 10px",
      border: ShowDropdown
        ? `1px solid ${theme.palette.primary.main}`
        : !isError
        ? `2px solid ${theme.palette.grey[200]}`
        : `1px solid ${theme.palette.error.main}`,
      "&:hover": {
        borderColor: "none",
      },
      ...style,
    }),
    singleValue: (base) => ({
      ...base,
      color: theme.palette.text.secondary,
    }),
    menu: (base: any) => ({
      ...base,
      margin: " 0.625rem 0 0",
      boxShadow: "0",
      paddingBottom: "0.75rem",
      borderRadius: "0 0 20px 20px",
      border: `1px solid ${theme.palette.primary.main}`,
      width: "100%",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: theme.palette.text.disabled,
    }),
    option: (
      styles: any,
      { isSelected, isDisabled }: { isSelected: any, isDisabled: any }
    ) => {
      return {
        ...styles,
        width: "100%",
        marginTop: "1.875rem",
        padding: 0,
        outline: "none",
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: 500,
        backgroundColor: theme.palette.background.paper,
        color:
          isSelected || isDisabled
            ? theme.palette.secondary.main
            : theme.palette.text.disabled,
        cursor: "pointer",
        ":last-child": {
          marginBottom: "0.975rem",
        },
        ":hover": {
          background: theme.palette.background.paper,
        },
      };
    },
    menuList: (base: any) => ({
      ...base,
      padding: 0,
      direction: "rtl",
      "&::-webkit-scrollbar": {
        width: "10px",
        overflow: "hidden",
      },
      "&::-webkit-scrollbar-track": {
        background: theme.palette.background.paper,
      },
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.grey[50],
        borderRadius: "8px",
      },
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      cursor: "pointer",
    }),
  };

  useEffect(() => {
    selectedOptions && setSelectedItems(selectedOptions);
  }, [selectedOptions]);

  const ArrowDownIcon = () => {
    let icon = ShowDropdown ? (
      <img src={images.icons.angleUpPrimary} alt="angleUpPrimary" />
    ) : (
      <img src={images.icons.angleDownDisabled} alt="angleDownDisabled" />
    );
    return icon;
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDownIcon />
      </components.DropdownIndicator>
    );
  };

  const handleOpenIcon = () => {
    setShowDropdown(true);
  };
  const handleCloseIcon = () => {
    setShowDropdown(false);
  };
  const handleChange = (option: IOption<string | number>) => {
    if (option) {
      onInputChange(option);
    }
  };
  return (
    <div className={classes.container}>
      {label && (
        <div className={clsx(classes.label)}>
          <label>
            {label}
            {required && (
              <span className={classes.requiredMessage}>( الزامی )</span>
            )}
          </label>
        </div>
      )}
      {hint && <p className={classes.hint}>{hint}</p>}
      <div>
        <Select
          placeholder={placeholder ? placeholder : "هینت"}
          value={
            selectedItems?.length !== 0
              ? selectedItems[selectedItems?.length - 1]
              : null
          }
          options={options}
          noOptionsMessage={() => "موردی یافت نشد!"}
          isDisabled={isDisabled}
          isSearchable={false}
          isOptionDisabled={(option) =>
            selectedItems?.find((item) => item.value === option.value)
          }
          onChange={handleChange}
          onMenuOpen={handleOpenIcon}
          onMenuClose={handleCloseIcon}
          components={{ DropdownIndicator, IndicatorSeparator: () => null }}
          captureMenuScroll={false}
          maxMenuHeight={170}
          styles={Styles}
          {...style}
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );
};

export default CustomMultiDropdown;
