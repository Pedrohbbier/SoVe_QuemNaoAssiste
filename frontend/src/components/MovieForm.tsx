import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, CircularProgress, Autocomplete, Snackbar } from '@mui/material';

const initialMovieState = {
  name: '',
  directorId: null,
  studioId: null,
  actorIds: [],
  synopsis: '',
  country: '',
};

const MovieForm: React.FC = () => {
  const [movie, setMovie] = useState(initialMovieState);
  const [directors, setDirectors] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
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
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleDirectorChange = (event: any, value: any) => {
    setMovie({ ...movie, directorId: value?.id || null });
  };

  const handleActorsChange = (event: any, value: any) => {
    setMovie({ ...movie, actorIds: value.map((actor: any) => actor.id) });
  };

  const handleStudioChange = (event: any, value: any) => {
    setMovie({ ...movie, studioId: value?.id || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios.post('http://localhost:5119/movies', movie)
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setMovie(initialMovieState); // Reset form after submission
      })
      .catch((error) => {
        console.error('Error saving movie:', error);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Manage Movies</Typography>
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
            renderInput={(params) => <TextField {...params} label="Director" />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={studios} // Studio select
            getOptionLabel={(option) => option.name}
            onChange={handleStudioChange}
            renderInput={(params) => <TextField {...params} label="Studio" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={actors}
            getOptionLabel={(option) => option.name}
            onChange={handleActorsChange}
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
