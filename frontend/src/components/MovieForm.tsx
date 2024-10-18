import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, CircularProgress, Autocomplete, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom'; // Para obter o ID da URL

// Definindo o tipo de um ator
interface Actor {
  id: number;
  name: string;
}

// Definindo o tipo do filme
interface Movie {
  name: string;
  directorId: number | null;
  studioId: number | null;
  actorIds: number[];
  synopsis: string;
  country: string;
}

const initialMovieState: Movie = {
  name: '',
  directorId: null,
  studioId: null,
  actorIds: [],
  synopsis: '',
  country: '',
};

const MovieForm: React.FC = () => {
  const { id } = useParams(); // Obter o ID da URL
  const [movie, setMovie] = useState<Movie>(initialMovieState);
  const [directors, setDirectors] = useState<any[]>([]);
  const [actors, setActors] = useState<Actor[]>([]); // Tipando atores
  const [studios, setStudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch directors, actors, and studios when the component loads
    axios.get('http://localhost:5119/directors')
      .then(response => setDirectors(response.data))
      .catch(error => console.error('Error fetching directors:', error));

    axios.get('http://localhost:5119/actors')
      .then(response => setActors(response.data))
      .catch(error => console.error('Error fetching actors:', error));

    axios.get('http://localhost:5119/studios') // Fetch studios
      .then(response => setStudios(response.data))
      .catch(error => console.error('Error fetching studios:', error));

    // Se houver um ID, buscar os dados do filme para edição
    if (id) {
      axios.get(`http://localhost:5119/movies/${id}`)
        .then(response => setMovie(response.data))
        .catch(error => console.error('Error fetching movie:', error));
    }
  }, [id]); // Dependência no ID

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleDirectorChange = (event: any, value: any) => {
    setMovie({ ...movie, directorId: value?.id || null });
  };

  const handleActorsChange = (event: any, value: Actor[]) => {
    setMovie({ ...movie, actorIds: value.map((actor: Actor) => actor.id) });
  };

  const handleStudioChange = (event: any, value: any) => {
    setMovie({ ...movie, studioId: value?.id || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const saveOrUpdate = id
      ? axios.put(`http://localhost:5119/movies/${id}`, movie)
      : axios.post('http://localhost:5119/movies', movie);

    saveOrUpdate
      .then(() => {
        setLoading(false);
        setSuccess(true);
        if (!id) setMovie(initialMovieState); // Reset form if it's a new movie
      })
      .catch((error) => {
        console.error('Error saving movie:', error);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }} >
      <Typography variant="h4" gutterBottom>{id ? 'Edit Movie' : 'Add Movie'}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Movie Name"
            name="name"
            value={movie.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={directors}
            getOptionLabel={(option) => option.name}
            onChange={handleDirectorChange}
            value={directors.find(d => d.id === movie.directorId) || null} // Preencher o valor selecionado
            renderInput={(params) => <TextField {...params} label="Director" />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={studios} // Studio select
            getOptionLabel={(option) => option.name}
            onChange={handleStudioChange}
            value={studios.find(s => s.id === movie.studioId) || null} // Preencher o valor selecionado
            renderInput={(params) => <TextField {...params} label="Studio" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={actors}
            getOptionLabel={(option) => option.name}
            onChange={handleActorsChange}
            value={actors.filter((a: Actor) => movie.actorIds.includes(a.id))} // Tipado corretamente
            renderInput={(params) => <TextField {...params} label="Actors" />}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Synopsis"
            name="synopsis"
            value={movie.synopsis}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={movie.country}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save Movie'}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        message="Movie saved successfully"
        onClose={() => setSuccess(false)}
      />
    </form>
  );
};

export default MovieForm;
