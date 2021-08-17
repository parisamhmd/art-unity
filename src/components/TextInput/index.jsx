import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormControl, makeStyles, FilledInput } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    normalInput: {
        // backgroundColor: "green",
        "&.MuiFilledInput-root": {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.grey[400]}`,
        },
        "& .MuiFilledInput-input": {
            padding: "10px 20px 10px 20px",
        },
    },
    disabled: {
        opacity: "0.6",
    },
}));

const TextInput = ({
                       id,
                       name,
    label,
                       value,
                       type,
                       placeholder,
                       isDisabled,
                       hasError,
                       isRequired,
                       showRequiredText,
                       className,
                       onChange,
                       ...rest
                   }) => {
    const classes = useStyles();
    const [text, setText] = useState("");
    useEffect(() => {
        setText(value ? value : "");
    }, [value]);
    const handleChange = (text) => {
        setText(text);
        onChange(text);
    };
    return (
        <div>
            <label>{label}</label>
            <FormControl fullWidth>
                <FilledInput
                    fullWidth
                    id={id}
                    placeholder={placeholder}
                    aria-describedby={`${id}-helper`}
                    value={text}
                    type={type}
                    name={name}
                    disableUnderline
                    className={clsx(
                        className,
                        classes.normalInput,
                        `rounded-md`,"text-center",
                        hasError ? "border-primary-main" : "",
                        isDisabled ? classes.disabled : ""
                    )}
                    inputProps={{
                        className: `placeholder-text-disabled focus:shadow-md`,
                    }}
                    required={isRequired}
                    disabled={isDisabled}
                    onChange={(event) => handleChange(event.target.value)}
                    {...rest}
                />
                <div>
                    {showRequiredText && (
                        <p
                            className={`
              text-sm
              ml-4
              mt-1
              text-primary-main
              font-medium
          `}
                        >
                            * This field is required
                        </p>
                    )}
                </div>
            </FormControl>
        </div>
    );
};
export default TextInput;
