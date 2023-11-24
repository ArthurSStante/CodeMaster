import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie'



const iconStyle = {
  color: "#FFFFFF",
};

const textStyle = {
  color: "#FFFFFF",
};
export const mainListItems = (
  <React.Fragment>
    <Divider sx={{ my: 1 }} />
    <ListItemButton component={Link} to="/Dashboard">
      <ListItemIcon style={iconStyle}>
        <HomeOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" style={textStyle} />
    </ListItemButton>

    <Divider sx={{ my: 1 }} />
    <ListItemButton component={Link} to="/OrderTable">
      <ListItemIcon style={iconStyle}>
        <Inventory2OutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Estoque" style={textStyle} />
    </ListItemButton>

    <ListItemButton component={Link} to="/CadProducts">
      <ListItemIcon style={iconStyle}>
        <ShoppingCartOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Novos Produtos" style={textStyle} />
    </ListItemButton>
    <Divider sx={{ my: 1 }} />

    <ListItemButton component={Link} to="/OrgTable">
      <ListItemIcon style={iconStyle}>
        <PeopleOutlineOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Fornecedores" style={textStyle} />
    </ListItemButton>

    <ListItemButton component={Link} to="/CadOrg">
      <ListItemIcon style={iconStyle}>
        <PersonAddAlt1OutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Novo Fornecedor" style={textStyle} />
    </ListItemButton>
    <Divider sx={{ my: 1 }} />

    <ListItemButton component={Link} to="/BudgetsTable">
      <ListItemIcon style={iconStyle}>
        <ContentPasteOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Orçamentos" style={textStyle} />
    </ListItemButton>

    <ListItemButton component={Link} to="/CadBudgets">
      <ListItemIcon style={iconStyle}>
        <NoteAddOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Novo Orçamento" style={textStyle} />
    </ListItemButton>
  </React.Fragment>
);

export const SecondaryListItems = ({ hideLogoutIcon }) => {
  // Mova a chamada do useCookies para dentro do componente funcional
  const [cookie, setCookie, removeCookie] = useCookies(["id"]);
  const username = cookie.nome || 'visitante';

  const eliminaCookie = () => {
    // remove o cookie nome
    removeCookie("id");
  };

  return (
    <React.Fragment>
       <div style={{ display: "flex" }}>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleOutlinedIcon style={{ ...iconStyle, fontSize: 45 }} />
          </ListItemIcon>
          <ListItemText primary={username} style={textStyle} />
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        {!hideLogoutIcon && (
          <ListItemButton component={Link} to="/" onClick={eliminaCookie}>
            <ListItemIcon>
              <LogoutOutlinedIcon style={iconStyle} />
            </ListItemIcon>
          </ListItemButton>
        )}
      </div>
    </React.Fragment>
  );
};