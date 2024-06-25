import React, { useState } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';
import { useBooks } from '../context/BookContext';

const Dashboard: React.FC = () => {
  const { books } = useBooks();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Book Management Dashboard</h1>
      <button 
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add New Book
      </button>
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