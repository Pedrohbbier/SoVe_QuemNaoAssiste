import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, CircularProgress, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom'; // Para obter o ID da URL

interface Studio {
  name: string;
  country: string;
}

const initialStudioState: Studio = {
  name: '',
  country: '',
};

const StudioForm: React.FC = () => {
  const { id } = useParams(); // Obter o ID da URL
  const [studio, setStudio] = useState<Studio>(initialStudioState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Se houver um ID, buscar os dados do estúdio para edição
    if (id) {
      axios.get(`http://localhost:5119/studios/${id}`)
        .then(response => setStudio(response.data))
        .catch(error => console.error('Error fetching studio:', error));
    }
  }, [id]); // Dependência no ID

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudio({ ...studio, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const saveOrUpdate = id
      ? axios.put(`http://localhost:5119/studios/${id}`, studio)
      : axios.post('http://localhost:5119/studios', studio);

    saveOrUpdate
      .then(() => {
        setLoading(false);
        setSuccess(true);
        if (!id) setStudio(initialStudioState); // Reset form if it's a new studio
      })
      .catch((error) => {
        console.error('Error saving studio:', error);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }} >
      <Typography variant="h4" gutterBottom>{id ? 'Edit Studio' : 'Add Studio'}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Studio Name"
            name="name"
            value={studio.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={studio.country}
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
            {loading ? <CircularProgress size={24} /> : 'Save Studio'}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        message="Studio saved successfully"
        onClose={() => setSuccess(false)}
      />
    </form>
  );
};

export default StudioForm;
