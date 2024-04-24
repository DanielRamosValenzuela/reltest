import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Estado</td>
            <td>Fecha</td>
            <td>Cantidad</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Daniel Ramos
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pendiente
              </span>
            </td>
            <td>21.04.2024</td>
            <td>$10.200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Daniel Ramos
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Finalizada</span>
            </td>
            <td>21.04.2024</td>
            <td>$34.200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Daniel Ramos
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Cancelada
              </span>
            </td>
            <td>21.04.2024</td>
            <td>$6.200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Daniel Ramos
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pendiente
              </span>
            </td>
            <td>21.04.2024</td>
            <td>$9.200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;