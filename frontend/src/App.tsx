import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Box,
  ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MoviesList from './components/MovieList';
import MovieForm from './components/MovieForm';
import DirectorForm from './components/DirectorForm';
import ActorForm from './components/ActorForm';
import StudioForm from './components/StudioForm';
import ActorList from './components/ActorsList';
import DirectorList from './components/DirectorList';
import StudioList from './components/StudioList';

interface MenuProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

function Menu({ open, toggleDrawer }: MenuProps) {
  const menuItems = [
    { text: 'View Movies', icon: <MovieIcon />, path: '/' },
    { text: 'View Actors', icon: <PersonIcon />, path: '/actors' },
    { text: 'View Directors', icon: <PersonIcon />, path: '/directors' },
    { text: 'View Studios', icon: <BusinessIcon />, path: '/studios' },
    { text: 'Manage Movies', icon: <ManageAccountsIcon />, path: '/manage-movies' },
    { text: 'Manage Directors', icon: <ManageAccountsIcon />, path: '/manage-directors' },
    { text: 'Manage Actors', icon: <ManageAccountsIcon />, path: '/manage-actors' },
    { text: 'Manage Studios', icon: <ManageAccountsIcon />, path: '/manage-studios' },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} onClick={toggleDrawer(false)}>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => () => {
    setDrawerOpen(open);
  };

  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie Management
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Menu open={drawerOpen} toggleDrawer={toggleDrawer} />

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/actors" element={<ActorList />} />
          <Route path="/directors" element={<DirectorList />} />
          <Route path="/studios" element={<StudioList />} />
          <Route path="/manage-movies" element={<MovieForm />} />
          <Route path="/manage-movies/:id" element={<MovieForm />} />
          <Route path="/manage-directors" element={<DirectorForm />} />
          <Route path="/manage-directors/:id" element={<DirectorForm />} />
          <Route path="/manage-actors" element={<ActorForm />} />
          <Route path="/manage-actors/:id" element={<ActorForm />} />
          <Route path="/manage-studios" element={<StudioForm />} />
          <Route path="/manage-studios/:id" element={<StudioForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
