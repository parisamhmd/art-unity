import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AppBar, Drawer, MenuList, MenuItem } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../services/assets/Img/Logo/logo.svg";
import { routes } from "../../services/constant/routes";
import Cookies from "js-cookie";
import clsx from "clsx";

const drawerWidth = 12;
const headerHeight = 4;

const BaseLayout = ({ children, crumb }) => {
  const classes = useStyle();
  const { pathname } = useLocation();
  const history = useHistory();

  const handleExit = () => {
    Cookies.remove("token");
    history.push("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.drawerBox}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.logoBox}>
            <img
              style={{ height: "4rem", width: "8.938rem" }}
              src={logo}
              alt="logo"
            />
          </div>
          <div className={classes.scrollBox}>
            <div className="h-0.5" />
            <div>
              <MenuList>
                {routes.map((route) => (
                  <Link to={route.path}>
                    <MenuItem style={{ paddingTop: "1rem" }}>
                      <div className="ml-4">{route.icon}</div>
                      <p
                        className={clsx(
                          {
                            [classes.selectedBox]: pathname === route.path,
                          },
                          classes.text
                        )}
                      >
                        {route.title}
                      </p>
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </div>
          </div>
        </Drawer>
      </div>
      <div className={classes.mainBox}>
        <AppBar position="fixed" className={classes.appBar}>
          <ExitToAppIcon
            className="cursor-pointer"
            onClick={() => handleExit()}
            style={{ fontSize: "2rem", margin: "0.875rem", color: "black" }}
          />
        </AppBar>
        <main className={classes.main}>{children}</main>
      </div>
    </div>
  );
};

export default BaseLayout;
const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    height: `${headerHeight - 0.125}rem`,
    width: `calc(100% - ${drawerWidth}rem)`,
    marginRight: `${drawerWidth}rem`,
    boxShadow: `2px 2px 2px ${theme.palette.grey[100]}`,
    backgroundColor: theme.palette.background.paper,
  },
  mainBox: {
    flexGrow: 1,
  },
  main: {
    padding: `${headerHeight + 5}rem 3.25rem `,
    direction: "rtl",
    backgroundColor: theme.palette.grey[25],
    paddingRight: `${drawerWidth + 5}rem `,
    minHeight: "100vh",
  },
  drawerBox: {
    width: `${drawerWidth}rem)`,
  },
  drawer: {
    width: `${drawerWidth}rem)`,
    flexShrink: 0,
    direction: "rtl",
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    width: `${drawerWidth}rem)`,
    height: "100vh",
    overflowY: "hidden",
  },
  logoBox: {
    height: `${headerHeight}rem`,
    width: "100%",
    padding: "0rem 1.5rem ",
    borderBottom: `solid 0.125rem ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.background.paper,
    zIndex: 200,
  },
  scrollBox: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 0,
      padding: "1px",
    },
  },
  selectedBox: {
    fontWeight: 600,
    fontFamily: "Vazir",
    color: theme.palette.secondary.main,
  },
  text: {
    fontFamily: "Vazir",
    fontWeight: 500,
  },
}));
