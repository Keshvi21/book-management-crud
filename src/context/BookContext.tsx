import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: number, book: Omit<Book, 'id'>) => void;
  deleteBook: (id: number) => void;
}

interface BookProviderProps {
  children: ReactNode;
}

export const BookContext = createContext<BookContextType | undefined>(undefined);


export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', publicationYear: 1960, genre: 'Fiction' },
    { id: 2, title: '1984', author: 'George Orwell', publicationYear: 1949, genre: 'Dystopian' },
  ]);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now() };
    setBooks([...books, newBook]);
  };

  const updateBook = (id: number, updatedBook: Omit<Book, 'id'>) => {
    setBooks(books.map(book => book.id === id ? { ...updatedBook, id } : book));
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};