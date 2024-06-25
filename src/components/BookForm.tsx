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
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
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
          <Form className="space-y-4">
            <div>
              <Field 
                type="text" 
                name="title" 
                placeholder="Title" 
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field 
                type="text" 
                name="author" 
                placeholder="Author" 
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field 
                type="number" 
                name="publicationYear" 
                placeholder="Publication Year" 
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="publicationYear" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field 
                type="text" 
                name="genre" 
                placeholder="Genre" 
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="genre" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              >
                {editingBook ? 'Update' : 'Add'} Book
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookForm;