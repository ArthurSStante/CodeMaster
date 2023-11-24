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
  {
    value: 2,
    label: "Prefeitura",
  },
];

export default function CadProduct() {
  const [nome, setNome] = React.useState("");
  const [data_chegada, setData_chegada] = React.useState("");
  const [data_validade, setData_validade] = React.useState("");
  const [quantidade_adicionada, setQuantidade_adicionada] = React.useState("");
  const [quantidade_minima, setQuantidade_minima] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [distribuidoraId, setDistribuidoraId] = React.useState("");

  const [cookies] = useCookies(["userId"]);

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nome: nome,
      data_chegada: data_chegada,
      data_validade: data_validade,
      quantidade_adicionada: Number(quantidade_adicionada),
      quantidade_minima: Number(quantidade_minima),
      categoria: categoria,
      descricao: descricao,
      userId: cookies.id,
      distribuidoraId: distribuidoraId,
    };
    console.log(JSON.stringify(data));

    try {
      const response = await fetch(`http://localhost:3333/produto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Produto adicionado com sucesso");
      } else {
        console.error("Erro ao adicionar o produto");
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
              Cadastrar Produtos
            </Typography>
          </Container>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                label="Nome do Produto"
                variant="filled"
              ></TextField>
              <TextField
                value={data_chegada}
                onChange={(e) => setData_chegada(e.target.value)}
                label="Data de Entrada"
                variant="filled"
              ></TextField>
              <TextField
                value={data_validade}
                onChange={(e) => setData_validade(e.target.value)}
                label="Data de Validade"
                variant="filled"
              ></TextField>
            </Box>

            <Box
              sx={{
                mt: "100px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                value={quantidade_adicionada}
                onChange={(e) => setQuantidade_adicionada(e.target.value)}
                label="Quantidade"
                variant="filled"
              ></TextField>
              <TextField
                value={quantidade_minima}
                onChange={(e) => setQuantidade_minima(e.target.value)}
                label="Quantidade Mínima"
                variant="filled"
              ></TextField>
              <TextField
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                label="Categoria"
                variant="filled"
              ></TextField>
            </Box>
            <Box
              sx={{
                mt: "100px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                value={distribuidoraId}
                onChange={(e) => setDistribuidoraId(e.target.value)}
                label="Fornecedor"
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
              <TextField
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                label="Descrição"
                variant="filled"
                multiline
                sx={{ width: "880px" }}
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
