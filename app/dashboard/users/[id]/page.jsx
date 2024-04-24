import styles from '@/app/components/users/singleUser/singleUser.module.css';
import { getUser } from '@/app/lib/dataUser';
import { updateUser } from '@/app/utils/formUserActions';
import Image from 'next/image';

const SingleUserPage = async ({ params }) => {
  
  const { id } = params;
  const user = await getUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id}/>
          <label>Usuario</label>
          <input type="text" name="username" placeholder={user.username} required/>
          <label>Correo</label>
          <input type="email" name="email" placeholder={user.email} required/>
          <label>Contraseña</label>
          <input type="password" name="password" required/>
          <label>Teléfono</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Dirección</label>
          <input type="text" name="address" placeholder={user.address} required/>
          <label>Numero de departamento</label>
          <input type="text" name="number" placeholder={user.number} />
          <label>Detalles</label>
          <textarea type="text" name="address" placeholder={user.details} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={user.isAdmin}>Si</option>
            <option value={false} selected={!user.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={user.isActive}>Si</option>
            <option value={false} selected={!user.isActive}>No</option>
          </select>
          <button>Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;