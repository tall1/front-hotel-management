import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import AuthContext from '../store/auth-context';

// import '../App.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const error = 'email or password incorrect';
  const theme = createTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const exists = await authCtx.login(email, password);
    console.log(`Signin: islogged in ${exists}`);
    if(!authCtx.isLoggedIn){
      navigate('/');
    }
    else{
      document.getElementById('errorlabel').removeAttribute('hidden');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                required
                margin="normal"
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => handleEmailChange(event)}
                autoFocus
              />

              <TextField
                required
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => handlePasswordChange(event)}
              />
              <label className="error" hidden id="errorlabel">
                {error}
              </label>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="./signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
};
export default SignIn;
