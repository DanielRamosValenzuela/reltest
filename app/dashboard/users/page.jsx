import Search from '@/app/components/search/search';
import styles from '../../components/users/users.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/app/components/pagination/pagination';
import { getUsers } from '@/app/lib/dataUser';
import { deleteUser } from '@/app/utils/formUserActions';

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await getUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Búsqueda de usuario..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Agregar nuevo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Correo</td>
            <td>Fecha de creación</td>
            <td>Rol</td>
            <td>Estado</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? "Administrador" : "Cliente"}</td>
              <td>{user.isActive ? "activo" : "deshabilitado"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Ver
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={(user.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Borrar
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count}/>
    </div>
  );
};

export default UsersPage;