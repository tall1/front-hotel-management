import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import {useContext} from 'react';
import AuthContext from '../../store/auth-context';
import logo from './newlogo.png';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const headerNav = (
    <Box
      className={styles.menu}
      sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
    >
      <Link to="/settings">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          Update Settings and start algorithm
        </Button>
      </Link>{' '}
      |
      <Link to="/uploadfile">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          Upload Data
        </Button>
      </Link>{' '}
      |
      <Link to="/tasks">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          Show Tasks
        </Button>
      </Link>{' '}
      |
      <Link to="/rooms">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>Rooms</Button>
      </Link>{' '}
      |
      <Link to="/reservations">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          Reservations
        </Button>
      </Link>
    </Box>
  );

  return (
    <AppBar className={styles.header} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={logo}  height={100} width={200} alt="Logo"/>
          <Link to="/" style={{ display: 'flex', textDecoration: 'none' }} >
            <Typography
              variant="h6"
              noWrap
              // component="a"
              href="/Login"
              sx={{
                color: '#fff',
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              Evolutionary <br/>
              Hotel <br/>
              Management
            </Typography>
          </Link>

          {authCtx.isLoggedIn ? headerNav : null}

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
