import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Para redirecionar

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para redirecionamento

  useEffect(() => {
    axios.get('http://localhost:5119/movies')
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const handleEdit = (id: number) => {
    navigate(`/manage-movies/${id}`); // Redirecionar para a página de edição com o ID
  };

  return (
    <Grid container spacing={3} style={{ marginTop: '20px' }}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{movie.name}</Typography>
              <Typography variant="body2">{movie.synopsis}</Typography>
              <Typography variant="caption">Country: {movie.country}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(movie.id)} // Botão de Editar
                style={{ marginTop: '10px' , marginLeft: '20px'}}
              >
                Edit Movie
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MoviesList;
