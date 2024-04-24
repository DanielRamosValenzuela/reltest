'use client';

import { HashLoader } from 'react-spinners';
import styles from './loadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <HashLoader color='#36d7b7' />
    </div>
  );
};

export default LoadingSpinner;
