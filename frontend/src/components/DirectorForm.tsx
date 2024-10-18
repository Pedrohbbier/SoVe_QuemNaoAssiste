import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Snackbar } from '@mui/material';

const initialDirectorState = {
  name: '',
  description: '',
};

const DirectorForm: React.FC = () => {
  const [director, setDirector] = useState(initialDirectorState);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDirector({ ...director, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('http://localhost:5119/directors', director)
      .then(() => {
        setSuccess(true);
        setDirector(initialDirectorState);
      })
      .catch((error) => console.error('Error saving director:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Manage Directors</Typography>
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
          <Button type="submit" variant="contained" color="primary">Save Director</Button>
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
