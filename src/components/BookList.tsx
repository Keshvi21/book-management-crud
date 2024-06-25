import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

interface BookListProps {
  books: Book[];
  onEdit: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit }) => {
  const { deleteBook } = useBooks();
  const [sortField, setSortField] = useState<keyof Book>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const sortedBooks = [...books].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (field: keyof Book) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('author')}>Author</th>
            <th onClick={() => handleSort('publicationYear')}>Year</th>
            <th onClick={() => handleSort('genre')}>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publicationYear}</td>
              <td>{book.genre}</td>
              <td>
                <button onClick={() => onEdit(book.id)}>Edit</button>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;