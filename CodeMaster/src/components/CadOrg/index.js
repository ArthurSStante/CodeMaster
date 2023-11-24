import * as React from "react";
import { mainListItems, secondaryListItems } from "../ListItems";
import CustomDrawer from "../Drawer";
import { Box, CssBaseline, TextField, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie";

const defaultTheme = createTheme({
  palette: {
    principal: "#02ABC2",
    harmonia: "#E6E6E6",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "370px",
          backgroundColor: " #E6E6E6",
          borderRadius: "3px",
          "& label": {
            color: "#000000",
          },
          "& label.Mui-focused": {
            color: "#1B4D53",
          },
          "& .MuiFilledInput-root": {
            "& fieldset": {},
            "&.Mui-focused:after": {
              borderColor: "#1B4D53",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "40px",
          marginTop: "130px",
          backgroundColor: "#1B4D53",
          ":hover": { backgroundColor: "#216F78" },
          width: "224px",
        },
      },
    },
  },
});

export default function CadOrg() {
  const [nome_distribuidora, setNome_distribuidora] = React.useState("");
  const [razao_social, setRazao_social] = React.useState("");
  const [telefone, setTelefone] = React.useState("");

  const [cookies] = useCookies(["id"]);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nome_distribuidora: nome_distribuidora,
      razao_social: razao_social,
      telefone: telefone,
      userId: cookies.id,
    };
    console.log(JSON.stringify(data));

    try {
      const response = await fetch(`http://localhost:3333/distribuidora`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Distribuidora adicionada com sucesso");
      } else {
        console.error("Erro ao adicionar o Distribuidora");
      }
    } catch (error) {
      console.error("Erro ao comunicar com o servidor:", error);
    }
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
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "principal",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container sx={{ ml: 15, mt: 4, mb: 4 }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              fontSize={"35px"}
              sx={{ mb: 10 }}
            >
              Novo Fornecedor
            </Typography>
          </Container>
          <Box>
            <Box
              component="form"
              noValidate
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                label="Nome do Fornecedor"
                variant="filled"
                value={nome_distribuidora}
                onChange={(e) => setNome_distribuidora(e.target.value)}
              ></TextField>
            </Box>
            <Box
              component="form"
              noValidate
              sx={{
                mt: "100px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                value={razao_social}
                onChange={(e) => setRazao_social(e.target.value)}
                label="Razão"
                variant="filled"
              ></TextField>
            </Box>
            <Box
              component="form"
              noValidate
              sx={{
                mt: "100px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                label="Telefone"
                variant="filled"
              ></TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="contained" href="/DashBoard">
                Voltar
              </Button>
              <Button  type="submit" variant="contained">
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
  // href="/OrgTable"
}
