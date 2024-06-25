import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <BookProvider>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto mt-4 p-4">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={<Dashboard /> }
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </BookProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;