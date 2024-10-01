import { useState } from 'react';
import axios from 'axios';

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
    setError(''); // Clear any previous errors
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
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </button>
          </div>

          {error && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
