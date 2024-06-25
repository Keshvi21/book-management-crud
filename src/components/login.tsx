import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values.email, values.password);
          setSubmitting(false);
          navigate('/dashboard');
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <Field 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;