import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/img/LogoLogin-fotor-89.png';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const defaultTheme = createTheme({
  palette: {
    principal: '#02ABC2',
    harmonia: '#E6E6E6',
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '375px',
          '& label': {
            color: '#000000',
          },
          '& label.Mui-focused': {
            color: '#1B4D53',
          },
          '& .MuiFilledInput-root': {
            '& fieldset': {},
            '&.Mui-focused:after': {
              borderColor: '#1B4D53',
            },
          },
        },
      },
    },
  },
});

const validateForm = (nome, usuario, email, telefone, senha) => {
  if (!nome || !usuario || !email || !telefone || !senha) {
    return false; // Se algum campo estiver vazio, retorna falso (formulário inválido)
  }
  return true; // Todos os campos estão preenchidos, retorna verdadeiro (formulário válido)
};

export default function CadUser() {  
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [id, setId] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = async (event) => {
    event.preventDefault();
  };
  // Substitui o alert
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSnackbar = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setOpenSnackbar(true);
  };

  // Cadastrar Usuario 
    const handleSubmit = async (e) => {
      e.preventDefault();

      // Validar o formulário antes de enviar
      if (!validateForm(nome, usuario, email, telefone, senha)) {
      // Exibir mensagem de erro
        handleSnackbar('Por favor, preencha todos os campos.');
        return;
      }
      // Objeto User
      let user = {
        nome,
        senha,
        email,
        telefone,
      };

      console.log('Entrou');

      try {
        // Cadastrar o usuário
        const cadastraUser = await fetch(`http://localhost:3333/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const resp = await cadastraUser.json();

        if (cadastraUser.ok) {
          console.log('Usuário cadastrado com sucesso!', resp);
          handleSnackbar('Usuário cadastrado com sucesso');
          navigate('/');
        } else if (cadastraUser.status === 409) {
          // Adicione um log para verificar se este bloco é alcançado
          console.log('Email já cadastrado:', resp);
          handleSnackbar('Email já cadastrado. Por favor, escolha outro email.');
        } else {
          console.error('Erro durante a solicitação:', resp);
          handleSnackbar('Erro durante o cadastro do usuário.');
        }
      } catch (error) {
      console.error('Erro durante a solicitação:', error);
      handleSnackbar('Erro de conexão');
      }
    };
    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
            backgroundColor={'principal'}
          >
            <Box
              sx={{
                mt: '50px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" fontWeight={'bold'}>
                CADASTRO
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit} // Certifique-se de que você está passando o evento corretamente
                sx={{
                  mt: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '50px',
                }}
              >
               <FormControl variant="filled"> 
                  <InputLabel>Nome</InputLabel>
                  <FilledInput
                    error={hasError}
                    helperText={errorMessage}
                    required
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>Usuario</InputLabel>
                  <FilledInput
                    error={hasError}
                    helperText={errorMessage}
                    required
                    name="usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>Email</InputLabel>
                  <FilledInput
                    error={hasError}
                    helperText={errorMessage}
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel>Telefone</InputLabel>
                  <FilledInput 
                    error={hasError}
                    helperText={errorMessage}
                    required
                    name="telefone"
                    value={telefone}  
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </FormControl>
                {/* Password */}
                <FormControl variant="filled">
                  <InputLabel>Senha</InputLabel>
                  <FilledInput
                    error={hasError}
                    helperText={errorMessage}
                    required
                    name="senha"
                    value={senha}  
                    onChange={(e) => setSenha(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
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
                {/* botao */}
                <Button
                  //herif="/SignInSid"
                  type="submit"
                  variant="contained"
                  disabled={!isFormValid}
                  sx={{
                    mt: "10px",
                    p: "10px",
                    backgroundColor: "#1B4D53",
                    ":hover": { backgroundColor: "#216F78" },
                    width: "180px",
                    fontWeight: "bold",
                  }}
                  >
                    CADASTRAR
                </Button>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#FFFFFF"
                  }}
                >
                  {/* Cadastro */}
                  <Grid item>
                    Já Possui Uma Conta? 
                    <Link href="/" variant="h8" sx={{ color: "#1B4D53", fontWeight: 780, letterSpacing: 0,}}>
                      {" Faça   Login"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity="error"
          >
            {errorMessage}
          </MuiAlert>
        </Snackbar>
      </ThemeProvider>
    );
}

