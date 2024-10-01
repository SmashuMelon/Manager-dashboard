import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, Alert, CircularProgress } from '@mui/material';

interface LoginProps {
  onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8000/api-token-auth/', {
        username,
        password,
      });
      const token = response.data.token;
      onLogin(token);  // Pass the token to the parent component
    } catch (err) {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          sx={{
            backgroundColor: 'white', // Set the background color to white
            padding: 4,               // Add padding inside the box
            borderRadius: 2,           // Add rounded corners
            boxShadow: 3,              // Add a subtle shadow
            width: '100%'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;