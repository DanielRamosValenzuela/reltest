import AddUserForm from '@/app/components/users/addUser/addUserForm';
import styles from '@/app/components/users/addUser/addUser.module.css';

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <AddUserForm />
    </div>
  );
};

export default AddUserPage;
