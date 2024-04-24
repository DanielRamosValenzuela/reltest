'use client';

import { authenticate } from '@/app/utils/authenticate';
import styles from './loginForm.module.css';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const handlerAuth = async (formData) => {
    const data = await authenticate(formData)
    if(data.error) return toast.error(data.error)
  }

  return (
    <form action={handlerAuth} className={styles.form}>
      <h1>Ingresar</h1>
      <input type='text' placeholder='Usuario' name='username' />
      <input type='password' placeholder='Contraseña' name='password' />
      <button>Ingresar</button>
    </form>
  );
};

export default LoginForm;
