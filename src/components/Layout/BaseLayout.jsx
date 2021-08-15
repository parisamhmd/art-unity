import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Drawer, MenuList, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../services/assets/Img/Logo/logo.svg";
// import logoutIcon from "../../services/assets/Img/Logo/icons8-shutdown-35.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { routes } from "../../services/constant/routes";
import clsx from "clsx";
// import { useQueryClient } from "react-query";
// import { images } from "services/constants/images";
// import { EUserActionTypes } from "services/contexts/UserContext/models";
// import { useUserDispatch } from "services/contexts/UserContext/UserContext";
// import { LSService } from "services/LocalStorage/localStorage";
// import { redirect } from "services/utils/redirect";
// import Header from "components/Header/Header";
// import SideNav from "components/SideNav";
// import MenuItem from "./MenuItems/MenuItem";
// import UserSummary from "./UserSummary/UserSummary";
// import { useSidebarCollapse } from "services/contexts/SideNavContext/SidenavCollapseContext";
const drawerWidth = 12;
const headerHeight = 4;

const BaseLayout = ({ children, crumb }) => {
  const classes = useStyle();
  const { pathname } = useLocation();
  //   const userDispatch = useUserDispatch();
  //   const queryClient = useQueryClient();
  //   const [, setCollapsedItems] = useSidebarCollapse();
  const handleExit = () => {
    //     LSService.clearToken();
    //     redirect("/dashboard/auth", true);
    //     userDispatch({ type: EUserActionTypes.LOGOUT });
    //     // noinspection JSIgnoredPromiseFromCall
    //     queryClient.resetQueries();
    //     setCollapsedItems(null);
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
          <div
            className={classes.scrollableBox}
            style={{ overflowY: "scroll" }}
          >
            <div className="h-0.5" />
            <div className={classes.exitBtnBox}>
              <MenuList>
                {routes.map((route) => (
                  <Link to={route.path}>
                    <MenuItem style={{ paddingTop: "1rem" }}>
                      <img
                        src={route.icon}
                        className="px-3"
                        alt={route.title}
                      />
                      <span
                        className={clsx({
                          [classes.selectedBox]: pathname === route.path,
                        })}
                      >
                        {route.title}
                      </span>
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
    paddingRight: `${drawerWidth + 5}rem `,
    minHeight: "100vh",
  },
  sideBox: {
    paddingBottom: "8rem",
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
  scrollableBox: {
    "&::-webkit-scrollbar": {
      width: "0",
      padding: "1px",
    },
  },
  exitBtnBox: {
    textAlign: "center",
    paddingBottom: "2rem",
  },
  exitButton: {
    fontSize: ".875rem",
    fontWeight: "bold",
    padding: ".5rem 2rem",
  },
  selectedBox: {
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
}));
