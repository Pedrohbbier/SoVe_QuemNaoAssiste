import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import MoviesList from './components/MovieList';
import MovieForm from './components/MovieForm';
import DirectorForm from './components/DirectorForm';
import ActorForm from './components/ActorForm';
import StudioForm from './components/StudioForm';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movies Management App
          </Typography>
          <Button color="inherit" component={Link} to="/">View Movies</Button>
          <Button color="inherit" component={Link} to="/manage-movies">Manage Movies</Button>
          <Button color="inherit" component={Link} to="/manage-directors">Manage Directors</Button>
          <Button color="inherit" component={Link} to="/manage-actors">Manage Actors</Button>
          <Button color="inherit" component={Link} to="/manage-studios">Manage Studios</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/manage-movies" element={<MovieForm />} />
          <Route path="/manage-movies/:id" element={<MovieForm />} /> {/* Rota para editar filmes */}
          <Route path="/manage-directors" element={<DirectorForm />} />
          <Route path="/manage-directors/:id" element={<DirectorForm />} /> {/* Rota para editar diretores */}
          <Route path="/manage-actors" element={<ActorForm />} />
          <Route path="/manage-actors/:id" element={<ActorForm />} /> {/* Rota para editar atores */}
          <Route path="/manage-studios" element={<StudioForm />} />
          <Route path="/manage-studios/:id" element={<StudioForm />} /> {/* Rota para editar estúdios */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
