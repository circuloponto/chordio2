import { useState } from 'react';
import styles from '../../styles/Register.module.scss'
import axios from 'axios';
const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitRequest, setSubmitRequest] = useState({
    error: false,
    isLoading: false,
    submitted: false,
    errorMessage: '',
  });
  const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Register!!!');
    try {
      //pedido de signup
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/signup',
        { email, password, name }
      );

      setSubmitRequest({
        error: false,
        isLoading: false,
        submitted: true,
        errorMessage: ''
      });

      setTimeout(() => {
        setSubmitRequest({
          submitted: false,
          error: false,
          isLoading: false,

          errorMessage: ''
        });
      }, 4000);
    } catch (error: any) {
      console.log(error);
      setSubmitRequest({
        error: true,
        errorMessage: error.response.data.message,
        submitted: true,
        isLoading: false,
      });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={onRegisterSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          required
          id="name"
          value={name}
          className='inputName'
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          required
          id="email"
          value={email}
          className='inputEmail'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          id="password"
          value={password}
          className='inputPassword'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
        {submitRequest.error && <p>{submitRequest.errorMessage}</p>}
        {!submitRequest.error && submitRequest.submitted && (
          <p>Account Created</p>
        )}
        {submitRequest.isLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
