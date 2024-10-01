import { useState } from 'react';
import LoginPage from './components/LoginPage';
import DepartmentSection from './components/department/DepartmentSection';
import EmployeeSection from './components/employee/EmployeeSection';
import TaskSection from './components/task/TaskSection';

const App = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLogin = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);  // Store token in local storage
  };

  const handleLogout = () => {
    setToken(null); // Clear the token from state
    localStorage.removeItem('token'); // Remove the token from local storage
  };

  // If the user is not logged in, show the login page
  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-teal-500 shadow">
        <h1 className="text-xl font-bold text-white">Management Panel</h1>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="flex gap-3 flex-1 w-full p-5">
        <DepartmentSection />
        <EmployeeSection />
        <TaskSection />
      </div>
    </div>
  );
};

export default App;
