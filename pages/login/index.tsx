import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import styles from '../../styles/Login.module.scss'
import AppContext from '@/components/AppContext'
import { useContext } from 'react'


import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const context = useContext(AppContext)
  interface subReq {
    error: boolean,
    isLoading: boolean,
    submitted: boolean,
    errorMessage: string,
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitRequest, setSubmitRequest] = useState<subReq>();
  //const navigate = useNavigate();
  const router = useRouter()
  const onRegisterSubmit = async (e: any) => {
    e.preventDefault();

    console.log('Login!!!');
    try {
      //pedido de login
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/login',

        { email, password }
      );
      const me = await axios.get(
        'https://x8ki-letl-twmt.n7.xano.io/api:4m4S1GeF/auth/me',

        { headers: { Authorization: 'Bearer ' + response.data.authToken } },
      );
      localStorage.setItem('authToken', response.data.authToken);
      console.log('response', response);
      console.log('me', me);
      //cookies().set('authToken', response.data.authToken)
      Cookies.set('authToken', response.data.authToken, { expires: 7 });
      context.setNameContext(response.data.authToken)
      //context.setNameContext(me)
      //setIsLoggedIn(true);
      router.push('/mysongs')
      setSubmitRequest({
        error: false,
        isLoading: false,
        submitted: true,
        errorMessage: '',
      });

      setTimeout(() => {
        setSubmitRequest({
          submitted: false,
          error: false,
          errorMessage: '',
          isLoading: false,
        });
      }, 4000);
    } catch (error: any) {
      console.log(error);
      //setIsLoggedIn(false);
      setSubmitRequest({
        error: true,
        errorMessage: error.response.data.message,
        submitted: true,
        isLoading: false,
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={onRegisterSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          required
          id="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          required
          id="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        {submitRequest.error && <p>{submitRequest.errorMessage}</p>}
        {!submitRequest.error && submitRequest.submitted && (
          <p>user logged in</p>
        )}
        {submitRequest.isLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default LoginForm;