import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

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
          <Link to="/" style={{ display: 'flex', textDecoration: 'none' }}>
            <AdbIcon sx={{ color: '#fff', mr: 1 }} />
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
              Hotel management
            </Typography>
          </Link>

          {authCtx.isLoggedIn ? headerNav : null}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={false}
            >
              {/* {settings.map((setting) => (
              <MenuItem key={setting}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
