import { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Container, Box, Typography, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';

interface Task {
  id: number;
  title: string;
  description: string;
  assigned_to: string; // Employee assigned to the task
  status: string; // Task status (e.g., 'completed', 'in progress')
  created_at: string; // Task creation date
}

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch tasks from the backend API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
    setLoading(false);
  };

  // Run the fetchTasks function when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Task Board
        </Typography>

        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id}>
                  <ListItem>
                    <ListItemText
                      primary={task.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Description: {task.description}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.primary">
                            Assigned To: {task.assigned_to}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.primary">
                            Status: {task.status}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.primary">
                            Created At: {new Date(task.created_at).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              ))
            ) : (
              <Typography>No tasks found</Typography>
            )}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default TaskBoard;
