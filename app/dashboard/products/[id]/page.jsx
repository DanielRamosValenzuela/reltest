import styles from '@/app/components/products/singleProduct/singleProduct.module.css';
import { getProduct } from '@/app/lib/dataProducts';
import { updateProduct } from '@/app/utils/formProductActions';
import Image from 'next/image';

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await getProduct(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={product.variants[0].img || '/noproduct.jpg'}
            alt=''
            fill
          />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type='hidden' name='id' value={product.id} />
          <label>Titulo</label>
          <input
            type='text'
            name='title'
            placeholder={product.title}
            required
          />
          <label>Categoría</label>
          <select name='category' id='category'>
            <option value='women'>Hombre</option>
            <option value='man'>Mujer</option>
          </select>
          <label>Descripción</label>
          <textarea
            name='desc'
            id='desc'
            rows='10'
            placeholder={product.desc}
            required
          ></textarea>
          {product.variants.map((variant, index) => (
            <div key={index} className={styles.variantContainer}>
              <label>Tamaño</label>
              <input
                type='text'
                name={`variants[${index}].size`}
                placeholder={variant.size}
                required
              />
              <label>Precio</label>
              <input
                type='number'
                name={`variants[${index}].price`}
                placeholder={variant.price}
                required
              />
              <label>Stock</label>
              <input
                type='number'
                name={`variants[${index}].stock`}
                placeholder={variant.stock}
                required
              />
              <input
                type='hidden'
                name={`variants[${index}].img`}
                placeholder={variant.img}
                value={variant.img}
              />
              <Image src={variant.img} alt='' width={100} height={100} />
            </div>
          ))}
          <button>Actualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
