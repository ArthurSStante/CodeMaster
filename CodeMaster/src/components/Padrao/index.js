import * as React from "react";
import { mainListItems, secondaryListItems } from "../ListItems";
import CustomDrawer from "../Drawer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const defaultTheme = createTheme({
  palette: {
    principal: "#02ABC2",
    harmonia: "#E6E6E6",
  },
});

export default function OrderTable() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          mainListItems={mainListItems}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: "principal",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              fontSize={"35px"}
              sx={{ mb: 3 }}
            >
              Produtos Cadastrados
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
