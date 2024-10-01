import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DepartmentSection from './components/department/DepartmentSection';
import EmployeeSection from './components/employee/EmployeeSection';
import TaskSection from './components/task/TaskSection';
import Taskboard from './components/Taskboard'; // Import your Taskboard component
import { Button, Box } from '@mui/material';

const App = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="flex gap-3 h-full w-full min-h-screen p-5 flex-wrap">
        <Box display="flex" justifyContent="flex-end" width="100%" p={2}>
          {token && (
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>

        <Routes>
          {/* Default route for task sections */}
          <Route path="/" element={
            token ? (
              <>
                <DepartmentSection />
                <EmployeeSection />
                <TaskSection />
              </>
            ) : (
              <Navigate to="/login" />
            )
          } />
          
          {/* Route for Taskboard, accessible without authentication */}
          <Route path="/taskboard" element={<Taskboard />} />
          
          {/* Route for Login */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          
          {/* Redirect to home if the route is unknown */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
