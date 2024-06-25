import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useBooks } from '../context/BookContext';

interface BookFormProps {
  onClose: () => void;
  editingBookId: number | null;
}

const BookSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  author: Yup.string().required('Required'),
  publicationYear: Yup.number().required('Required').positive().integer(),
  genre: Yup.string().required('Required'),
});

const BookForm: React.FC<BookFormProps> = ({ onClose, editingBookId }) => {
  const { books, addBook, updateBook } = useBooks();
  const editingBook = editingBookId ? books.find(book => book.id === editingBookId) : null;

  return (
    <div>
      <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
      <Formik
        initialValues={editingBook || { title: '', author: '', publicationYear: 0, genre: '' }}
        validationSchema={BookSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (editingBook) {
            updateBook(editingBook.id, values);
          } else {
            addBook(values);
          }
          setSubmitting(false);
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="title" placeholder="Title" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <Field type="text" name="author" placeholder="Author" />
              <ErrorMessage name="author" component="div" />
            </div>
            <div>
              <Field type="number" name="publicationYear" placeholder="Publication Year" />
              <ErrorMessage name="publicationYear" component="div" />
            </div>
            <div>
              <Field type="text" name="genre" placeholder="Genre" />
              <ErrorMessage name="genre" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {editingBook ? 'Update' : 'Add'} Book
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookForm;