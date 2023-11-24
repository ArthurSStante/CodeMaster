/// DrawerComponent.js
import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { SecondaryListItems } from '../ListItems';
import C from "../../assets/img/cC.png";
import Logo from "../../assets/img/codemaster.png";
import NavBar from "../../assets/img/FundoNav.png";
const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    backgroundImage: `url(${NavBar})`,
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const CustomDrawer = ({ open, toggleDrawer, mainListItems }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer} sx={{ width: "100%" }}>
          {open ? (
            <img src={Logo} width={"224.5px"} />
          ) : (
            <img src={C} width={"63px"} />
          )}
        </IconButton>
      </Toolbar>
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 22 }} />
      </List>
      <List>{open ? (
          <SecondaryListItems />
        ) : (
          <SecondaryListItems hideLogoutIcon />
        )}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;