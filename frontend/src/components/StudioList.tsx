import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Studio {
  id: number;
  name: string;
  country: string;
}

const StudioList: React.FC = () => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [filteredStudios, setFilteredStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Para redirecionamento

  useEffect(() => {
    axios.get('http://localhost:5119/studios')
      .then((response) => {
        setStudios(response.data);
        setFilteredStudios(response.data); // Iniciar com a lista completa
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching studios:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = studios.filter(studio => studio.name.toLowerCase().includes(value));
    setFilteredStudios(filtered);
  };

  const handleEdit = (id: number) => {
    navigate(`/manage-studios/${id}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ marginTop: '40px' }} >
      <TextField
        label="Search Studios"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      <List>
        {filteredStudios.map((studio) => (
          <ListItem key={studio.id}>
            <ListItemText
              primary={studio.name}
              secondary={`Country: ${studio.country}`}
            />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(studio.id)}
              >
                Edit
              </Button>
              <Button/>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StudioList;
