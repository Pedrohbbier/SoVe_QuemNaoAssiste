import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, CircularProgress, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom'; // Para obter o ID da URL

interface Actor {
  name: string;
  description: string;
}

const initialActorState: Actor = {
  name: '',
  description: '',
};

const ActorForm: React.FC = () => {
  const { id } = useParams(); // Obter o ID da URL
  const [actor, setActor] = useState<Actor>(initialActorState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Se houver um ID, buscar os dados do ator para edição
    if (id) {
      axios.get(`http://localhost:5119/actors/${id}`)
        .then(response => setActor(response.data))
        .catch(error => console.error('Error fetching actor:', error));
    }
  }, [id]); // Dependência no ID

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActor({ ...actor, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const saveOrUpdate = id
      ? axios.put(`http://localhost:5119/actors/${id}`, actor)
      : axios.post('http://localhost:5119/actors', actor);

    saveOrUpdate
      .then(() => {
        setLoading(false);
        setSuccess(true);
        if (!id) setActor(initialActorState); // Reset form if it's a new actor
      })
      .catch((error) => {
        console.error('Error saving actor:', error);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (!id) return;
    setDeleteLoading(true);
  
    axios.delete(`http://localhost:5119/actors/${id}`)
      .then(() => {
        setDeleteLoading(false);
        alert('Actor deleted successfully');
        window.location.href = '/actors';
      })
      .catch((error) => {
        console.error('Error deleting actor:', error);
        setDeleteLoading(false);
      });
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }} >
      <Typography variant="h4" gutterBottom>{id ? 'Edit Actor' : 'Add Actor'}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Actor Name"
            name="name"
            value={actor.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={actor.description}
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
            {loading ? <CircularProgress size={24} /> : 'Save Actor'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDelete}
            disabled={deleteLoading}
            style={{ marginLeft: '16px' }}
          >
            {deleteLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        message="Actor saved successfully"
        onClose={() => setSuccess(false)}
      />
    </form>
  );
};

export default ActorForm;
