'use client';

import styles from '@/app/components/users/addUser/addUser.module.css';
import { createUser } from '@/app/utils/formUserActions';
import { userValidation } from '@/app/utils/validations';
import toast from 'react-hot-toast';

const AddUserForm = () => {
  const onAction = async (formData) => {
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      number: formData.get('number'),
      details: formData.get('details'),
      isAdmin: formData.get('isAdmin'),
      isActive: formData.get('isActive'),
    };

    const result = userValidation.safeParse(data);
    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + ' ' + issue.message;
      });

      toast.error(errorMessage);
      return;
    }

    await createUser(data);
    toast.success('Usuario agregado');
  };

  return (
      <form action={onAction} className={styles.form}>
        <input
          type='text'
          placeholder='Usuario'
          id='username'
          name='username'
          required
        />
        <input
          type='email'
          placeholder='Correo'
          id='email'
          name='email'
          required
        />
        <input
          type='password'
          placeholder='Contraseña'
          id='password'
          name='password'
          required
        />
        <input
          type='password'
          placeholder='Repita la contraseña'
          id='confirmPassword'
          name='confirmPassword'
          required
        />
        <input type='phone' placeholder='Teléfono' id='phone' name='phone' />
        <input
          type='text'
          placeholder='Dirección'
          id='address'
          name='address'
          required
        />
        <input
          type='text'
          placeholder='Numero de departamento'
          id='number'
          name='number'
        />
        <select name='isAdmin' id='isAdmin'>
          <option value={false}>Es Administrador?</option>
          <option value={true}>Si</option>
          <option value={false}>No</option>
        </select>
        <select name='isActive' id='isActive'>
          <option value={true}>Esta activo?</option>
          <option value={true}>Si</option>
          <option value={false}>No</option>
        </select>
        <textarea
          name='details'
          id='details'
          rows='16'
          placeholder='Detalles'
        ></textarea>
        <button type='submit'>Agregar</button>
      </form>
  );
};

export default AddUserForm;
