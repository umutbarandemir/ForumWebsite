import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
//import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Logo from "../assets/logo.png";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Create Thread'];


const Nav = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#5C02B6',
      },
      secondary: {
        main: '#ECFA05',
      },
    },
  });
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        AGALAR
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();
  
  const signOut = () => {
    localStorage.removeItem("_id");
    navigate("/");
  };
  const login = () => {
    navigate("/login");
  };
  const navigateAbout = () => {
    navigate("/about");
  };
  const navigateCreateThreadPage = () => {
    if (localStorage.getItem("_id")) {
      navigate("/threads");
    } else {
      navigate("/login");
    }
  };
  const navigateHomePage = () => {
    navigate("/");
  }
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar component="nav" style={{ background: '#5700C6' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <Box
            component="img"
            sx={{
            height: 70,
            }}
            alt="Your logo."
            src={Logo}
            onClick={navigateHomePage}
        />
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Button onClick={navigateHomePage} sx={{ color: '#fff' }}>
                HOME
            </Button>
            <Button onClick={navigateAbout} sx={{ color: '#fff' }}>
                ABOUT
            </Button>
            <Button onClick={navigateCreateThreadPage} sx={{ color: '#fff' }}>
                CREATE THREAD
            </Button>
         
        </Box>
      {localStorage.getItem("_id") == null ?
      <ThemeProvider theme={theme}>
      
      <Button color="secondary"  variant="contained" onClick={login}>LogIn</Button>
    </ThemeProvider> : 
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
               
                <MenuItem onClick={signOut}>
                  <Typography textAlign="center">Sign out</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
            }
      
      </Toolbar>
    </AppBar>
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  </Box>
    );
};
Nav.propTypes = {

  window: PropTypes.func,
};
export default Nav;
