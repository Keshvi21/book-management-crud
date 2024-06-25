import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' , confirmPassword: ''}}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting }) => {
          register(values.email, values.password);
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
            <div>
              <Field  className="w-full p-2 border rounded" type="password" name="confirmPassword" placeholder="Confirm Password" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
            Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;