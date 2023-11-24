import * as React from "react";
import { mainListItems, secondaryListItems } from "../ListItems";
import CustomDrawer from "../Drawer";
import { Box, CssBaseline, TextField, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
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
const Fornecedor = [
  {
    value: 1,
    label: "ONG",
  },
];

export default function CadBudgets() {
  const [valor, setValor] = React.useState("");
  const [data_criacao, setData_criacao] = React.useState("");
  const [distribuidoraId, setDistribuidoraId] = React.useState("");
  const [descricao, setDescricao] = React.useState("");

  const [cookies] = useCookies(["userId"]);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      valor: Number(valor),
      descricao: descricao,
      data_criacao: data_criacao,
      userId: cookies.id,
      distribuidoraId: distribuidoraId,
    };
    console.log(JSON.stringify(data));

    try {
      const response = await fetch(`http://localhost:3333/orcamento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("orçamento adicionado com sucesso");
      } else {
        console.error("Erro ao adicionar o orçamento");
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
          <Container sx={{ ml: 15, mt: 4 }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              fontSize={"35px"}
              sx={{ mb: 7 }}
            >
              Novo Orçamento
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
                value={distribuidoraId}
                onChange={(e) => setDistribuidoraId(e.target.value)}
                label="Origem"
                variant="filled"
                select
                defaultValue=""
              >
                {" "}
                {Fornecedor.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box
              component="form"
              noValidate
              sx={{
                mt: "70px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                label="Descrição"
                variant="filled"
              ></TextField>
            </Box>
            <Box
              component="form"
              noValidate
              sx={{
                mt: "70px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                label="Valor"
                variant="filled"
              ></TextField>
            </Box>
            <Box
              component="form"
              noValidate
              sx={{
                mt: "70px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                value={data_criacao}
                onChange={(e) => setData_criacao(e.target.value)}
                label="Data de Criacao"
                variant="filled"
              ></TextField>
            </Box>
            <Box
              component="form"
              noValidate
              sx={{
                mt: "70px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            ></Box>
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
              <Button type="submit" variant="contained">
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
