import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, CircularProgress, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom'; // Para obter o ID da URL

interface Director {
  name: string;
  description: string;
}

const initialDirectorState: Director = {
  name: '',
  description: '',
};

const DirectorForm: React.FC = () => {
  const { id } = useParams(); // Obter o ID da URL
  const [director, setDirector] = useState<Director>(initialDirectorState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Se houver um ID, buscar os dados do diretor para edição
    if (id) {
      axios.get(`http://localhost:5119/directors/${id}`)
        .then(response => setDirector(response.data))
        .catch(error => console.error('Error fetching director:', error));
    }
  }, [id]); // Dependência no ID

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDirector({ ...director, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const saveOrUpdate = id
      ? axios.put(`http://localhost:5119/directors/${id}`, director)
      : axios.post('http://localhost:5119/directors', director);

    saveOrUpdate
      .then(() => {
        setLoading(false);
        setSuccess(true);
        if (!id) setDirector(initialDirectorState); // Reset form if it's a new director
      })
      .catch((error) => {
        console.error('Error saving director:', error);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    if (!id) return;
    setDeleteLoading(true);
  
    axios.delete(`http://localhost:5119/directors/${id}`)
      .then(() => {
        setDeleteLoading(false);
        alert('Director deleted successfully');
        window.location.href = '/directors';
      })
      .catch((error) => {
        console.error('Error deleting director:', error);
        setDeleteLoading(false);
      });
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }} >
      <Typography variant="h4" gutterBottom>{id ? 'Edit Director' : 'Add Director'}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Director Name"
            name="name"
            value={director.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={director.description}
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
            {loading ? <CircularProgress size={24} /> : 'Save Director'}
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
        message="Director saved successfully"
        onClose={() => setSuccess(false)}
      />
    </form>
  );
};

export default DirectorForm;
