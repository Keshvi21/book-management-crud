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
      <table className="w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 cursor-pointer text-start" onClick={() => handleSort('title')}>Title</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('author')}>Author</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('publicationYear')}>Year</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('genre')}>Genre</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id} className="border-b">
              <td className="p-3 text-start" >{book.title}</td>
              <td className="p-3 text-center">{book.author}</td>
              <td className="p-3 text-center">{book.publicationYear}</td>
              <td className="p-3 text-center">{book.genre}</td>
              <td className="p-3 text-center">
                <button 
                  onClick={() => onEdit(book.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
          <button 
            key={i} 
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookList;