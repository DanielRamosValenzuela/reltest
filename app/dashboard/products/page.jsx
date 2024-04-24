import Search from '@/app/components/search/search';
import Pagination from '@/app/components/pagination/pagination';
import styles from '../../components/products/products.module.css';
import Link from 'next/link';
import Image from "next/image";
import { getProducts } from '@/app/lib/dataProducts';
import { deleteProduct } from '@/app/utils/formProductActions';

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await getProducts(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Búsqueda de producto..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Agregar nuevo</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Titulo</td>
            <td>Descripción</td>
            <td>Precio</td>
            <td>Creado en</td>
            <td>Stock</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.variants[0].img || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>${product.variants[0].price}</td>
              <td>{product.createdAt?.toString().slice(4, 16)}</td>
              <td>{product.variants[0].stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Ver
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
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
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;