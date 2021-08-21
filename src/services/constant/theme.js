import { createTheme } from "@material-ui/core/styles";
export const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    primary: {
      main: "#002D62",
    },
    secondary: {
      main: "#F73668",
    },
    text: {
      primary: "#0a0520",
      secondary: "#817d8d",
    },
    success: {
      light: "rgba(0, 207, 135, 0.08)",
      main: "#00cf8a",
    },
    error: {
      light: "rgba(255, 51, 34, 0.08)",
      main: "#ff3528",
    },
    grey: {
      25: "#F5F6F3",
      50: "#D9D9D9",
      100: "rgba(23,23,23,0.08)",
      200: "rgba(23,23,23,0.2)",
      300: "rgba(23,23,23,0.5)",
      400: "#171717",
    },
  },
  direction: "rtl",
  overrides: {
    MuiButton: {
      root: {
        "&.animated": {
          "& .MuiButton-label": {
            zIndex: 110,
            position: "relative",
          },
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.2)",
          },
          "&:after": {
            content: '""',
            display: "inline-block",
            height: "100%",
            width: "100%",
            borderRadius: "inherit",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
            transition: "all .6s",
            background: "inherit",
            opacity: "1 !important",
          },
          "&:hover:after": {
            transform: "scaleX(1.4) scaleY(1.6)",
            opacity: "0 !important",
          },
          "&:focus": {
            transform: "translateY(-1px)",
            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  },
});
