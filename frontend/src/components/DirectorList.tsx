import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Director {
  id: number;
  name: string;
  description: string;
}

const DirectorList: React.FC = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [filteredDirectors, setFilteredDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Para redirecionamento

  useEffect(() => {
    axios.get('http://localhost:5119/directors')
      .then((response) => {
        setDirectors(response.data);
        setFilteredDirectors(response.data); // Iniciar com a lista completa
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching directors:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = directors.filter(director => director.name.toLowerCase().includes(value));
    setFilteredDirectors(filtered);
  };

  const handleEdit = (id: number) => {
    navigate(`/manage-directors/${id}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ marginTop: '40px' }} >
      <TextField
        label="Search Directors"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      <List>
        {filteredDirectors.map((director) => (
          <ListItem key={director.id}>
            <ListItemText
              primary={director.name}
              secondary={director.description}
            />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(director.id)}
              >
                Edit
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DirectorList;
