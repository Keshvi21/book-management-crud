import React, { useState } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { books } = useBooks();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<number | null>(null);

  return (
    <div>
      <h1>Book Management Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
      <button onClick={() => setShowForm(true)}>Add New Book</button>
      {showForm && (
        <BookForm
          onClose={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
          editingBookId={editingBook}
        />
      )}
      <BookList
        books={books}
        onEdit={(id) => {
          setShowForm(true);
          setEditingBook(id);
        }}
      />
    </div>
  );
};

export default Dashboard;