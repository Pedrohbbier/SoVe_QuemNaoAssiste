import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Snackbar } from '@mui/material';

const initialStudioState = {
  name: '',
  country: '',
};

const StudioForm: React.FC = () => {
  const [studio, setStudio] = useState(initialStudioState);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudio({ ...studio, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('http://localhost:5119/studios', studio)
      .then(() => {
        setSuccess(true);
        setStudio(initialStudioState); // Reset form after submission
      })
      .catch((error) => console.error('Error saving studio:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Manage Studios</Typography>
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
          <Button type="submit" variant="contained" color="primary">Save Studio</Button>
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
