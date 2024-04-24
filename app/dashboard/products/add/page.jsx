import styles from '@/app/components/products/addProduct/addProduct.module.css';
import AddProductForm from '@/app/components/products/addProduct/addProductForm';

const AddProductPage = () => {
  return (
    <div className={styles.container}>
     <AddProductForm/>
    </div>
  );
};

export default AddProductPage;
