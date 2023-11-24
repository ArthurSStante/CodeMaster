import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import logo from "../../assets/img/LogoLogin21.png";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCookies } from "react-cookie";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    principal: "#02ABC2",
    harmonia: "#E6E6E6",
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "375px",
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
  },
});

export default function SignInSide() {
  const navigate = useNavigate();
  const [nome, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [hasError, setHasError] = React.useState(false);
  const [errorMenssage, setErroMenssage] = React.useState(null);
  
  const [cookie, setCookie] = useCookies(["id"]);
  //Subtituindo o alert
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  // Autenticando o usuario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar se o e-mail e a senha foram fornecidos
    const data = {
      nome: nome,
      senha: senha,
    };

    if (!data.nome || !data.senha) {
      setHasError(true);
      setErroMenssage("Por favor, forneça um usuário e uma senha válidos.");
      setSnackbarOpen(true);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`http://localhost:3333/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

        if (response.ok) {
          const userId = responseData.id;
          setCookie("id", userId);
          setCookie("nome", nome);
          navigate("/DashBoard", { state: { nome: data.nome, userId: userId } });
        } else {
          setHasError(true);
          setErroMenssage(responseData.message || "Erro de autenticação");
          setSnackbarOpen(true);
        }
      } catch (error) {
        setHasError(true);
        setErroMenssage("Erro ao processar a solicitação.");
        setSnackbarOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    };
    const handleCloseSnackbar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setSnackbarOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

  // Para o usuario ver a senha
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          backgroundColor={"principal"}
        >
          <Box
            sx={{
              mt: "183px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
              }}
            >
              {/* Usuario */}
              <FormControl variant="filled">
                <InputLabel>Usuario</InputLabel>
                <FilledInput
                  error={hasError}
                  helperText={errorMenssage}
                  required
                  name="usuario"
                  value={nome}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </FormControl>
              {/* Password */}
              <FormControl variant="filled">
                <InputLabel>Password</InputLabel>
                <FilledInput
                  required
                  error={hasError}
                  helperText={errorMenssage}
                  name="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment>
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* Esqueceu a senha  */}
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: "#1B4D53" }}>
                  Esqueceu sua Senha?
                </Link>
              </Grid>
              {/* botao */}
              <Button
                // href="/DashBoard"
                type="submit"
                variant="contained"
                sx={{
                  mt: "170px",
                  mb: 2,
                  backgroundColor: "#1B4D53",
                  ":hover": { backgroundColor: "#216F78" },
                  width: "224px",
                }}
              >
                Entrar
              </Button>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Cadastro */}
                <Grid item>
                  <Link href="/CadUser" variant="body2" sx={{ color: "#1B4D53" }}>
                    {"Não possui uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {errorMenssage}
          </Alert>
      </Snackbar>
      </Grid>
    </ThemeProvider>
  );
}