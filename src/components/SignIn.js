import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SignIn() {
  const navigate = useNavigate();

  const error = 'email or password incorrect';
  const theme = createTheme();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await fetch(
      '/users/verify_email_password?email=' +
        data.get('email') +
        '&password=' +
        data.get('password')
    );
    const isExist = await res.json();
    if (isExist === false) {
      document.getElementById('errorlabel').removeAttribute('hidden');
    } else {
      const userId = await fetch(
        '/users/get_id_by_email?email=' + data.get('email')
      ).then((response) => response.json());
      sessionStorage.setItem('userId', userId);
      // const userData = await fetch('/users/' + userId).then(response => response.json());
      //  sessionStorage.setItem("userData", JSON.stringify(userData));
      // const hotelData = await fetch('/hotels/' + userData.hotelId).then(response => response.json());
      // sessionStorage.setItem("hotelData", JSON.stringify(hotelData));

      navigate('/login'); // Tocheck {state: data.get('email')}
    }
    /*        console.log({
            username: data.get('email'),
            password: data.get('password'),
        });*/
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
}
