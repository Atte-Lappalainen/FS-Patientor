
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useNavigate } from 'react-router-dom';

enum pages {
  Home = "Home",
  Patients = "Patients",
  Blog = "Blog"
}

export const HeaderAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  
  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (page: "Home" | "Patients" | "Blog") => {
    switch (page) {
      case pages.Home:
        navigate(`/`)
        break;
      case pages.Patients:
        navigate(`/patients`)
        break;
      case pages.Blog:
        navigate(`/Blog`)
        break;
      default:
        console.log("errror in headerappbar handlenavigation")
        break;
    }
    


  };

  // <BloodtypeIcon style={{ marginBottom: "0.5em" }}/>

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
  
    
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon/>
        
            </IconButton>
            <Menu
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorEl={anchorElNav}
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {(Object.keys(pages) as Array<keyof typeof pages>).map(page => (
                <MenuItem key={page} onClick={() => handleNavigation(page)} >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(Object.keys(pages) as Array<keyof typeof pages>).map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => handleNavigation(page)}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
