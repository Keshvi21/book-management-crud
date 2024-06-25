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
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting }) => {
          register(values.email, values.password);
          setSubmitting(false);
          navigate('/dashboard');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;