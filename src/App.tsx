import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import Dashboard from './components/dashboard';


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <BookProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
               
                  <Dashboard />
                
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BookProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;