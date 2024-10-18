import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Button, CircularProgress  , Grid2} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Actor {
  id: number;
  name: string;
  description: string;
}

const ActorList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [filteredActors, setFilteredActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Para redirecionamento

  useEffect(() => {
    // Carregar a lista de atores
    axios.get('http://localhost:5119/actors')
      .then((response) => {
        setActors(response.data);
        setFilteredActors(response.data); // Iniciar com a lista completa
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching actors:', error);
        setLoading(false);
      });
  }, []);

  // Filtrar os atores conforme o texto digitado na barra de pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = actors.filter(actor => actor.name.toLowerCase().includes(value));
    setFilteredActors(filtered);
  };

  const handleEdit = (id: number) => {
    navigate(`/manage-actors/${id}`); // Redirecionar para a página de edição com o ID
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ marginTop: '40px' }} >
      <TextField
        label="Search Actors"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      <List>
        {filteredActors.map((actor) => (
          <ListItem key={actor.id}>
            <ListItemText
              primary={actor.name}
              secondary={actor.description}
            />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(actor.id)}
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

export default ActorList;
