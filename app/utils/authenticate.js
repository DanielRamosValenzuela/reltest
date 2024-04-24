'use server';

import { signIn } from '../auth';

export const authenticate = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { username, password });
  } catch (err) {
    console.log('🚀 ~ authenticate ~ err:', err.message);
    if (err.message.includes('credentialssignin')) {
      return { error: 'Error en usuario o contraseña' };
    }
    throw err;
  }
};
