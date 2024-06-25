import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import { Book } from '../types/types';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const bookContext = useContext(BookContext);

  if (!bookContext) return null;

  const handleDelete = () => {
    bookContext.deleteBook(book.id);
  };

  console.log(book);

  return (
    <li>
      <h3>{book?.title}</h3>
      <p>{book?.author}</p>
      <p>{book?.publicationYear}</p>
      <p>{book?.genre}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default BookItem;
