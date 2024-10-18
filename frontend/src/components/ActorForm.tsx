import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Typography, Snackbar } from '@mui/material';

const initialActorState = {
  name: '',
  description: '',
};

const ActorForm: React.FC = () => {
  const [actor, setActor] = useState(initialActorState);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActor({ ...actor, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('http://localhost:5119/actors', actor)
      .then(() => {
        setSuccess(true);
        setActor(initialActorState);
      })
      .catch((error) => console.error('Error saving actor:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Manage Actors</Typography>
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
          <Button type="submit" variant="contained" color="primary">Save Actor</Button>
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
