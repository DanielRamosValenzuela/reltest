'use client';

import { useState } from 'react';
import styles from '@/app/components/products/addProduct/addProduct.module.css';
import { createProduct } from '@/app/utils/formProductActions';
import { productValidation } from '@/app/utils/validations';
import toast from 'react-hot-toast';
import { maxVariant, minVariant } from '@/app/constants/variantsAmount';
import Image from 'next/image';

const AddProductForm = () => {
  const [variantCount, setVariantCount] = useState(minVariant);
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    desc: '',
    variants: [{ size: '', price: 0, stock: 0, img: null }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value, files } = e.target;
    const newVariants = [...formData.variants];
    if (name === 'img' && files && files[0]) {
      newVariants[index][name] = files[0];
    } else {
      newVariants[index][name] = value;
    }
    setFormData((prevData) => ({
      ...prevData,
      variants: newVariants,
    }));
  };

  const addVariant = () => {
    if (variantCount < maxVariant) {
      setVariantCount(variantCount + 1);
      setFormData((prevData) => ({
        ...prevData,
        variants: [
          ...prevData.variants,
          { size: '', price: 0, stock: 0, img: null },
        ],
      }));
    }
    toast.success('Variante agregada');
  };

  const removeVariant = (index) => {
    if (variantCount > 1) {
      setVariantCount(variantCount - 1);
      const newVariants = [...formData.variants];
      newVariants.splice(index, 1);
      setFormData((prevData) => ({
        ...prevData,
        variants: newVariants,
      }));
    }
    toast.success('Variante borrada');
  };

  const handleImageUpload = (index, file) => {
    const formDataImage = new FormData();
    formDataImage.append('file', file);
    formDataImage.append('upload_preset', 'react-image');
    formDataImage.append('api_key', process.env.NEXT_PUBLIC_CLOUD_API_KEY);

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formDataImage,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.secure_url;
        const newVariants = [...formData.variants];
        newVariants[index].img = imageUrl;
        setFormData((prevData) => ({
          ...prevData,
          variants: newVariants,
        }));
      })
      .catch((error) => {
        console.error('Error al cargar la imagen a Cloudinary:', error);
      });
  };

  const onAction = async (e) => {
    e.preventDefault();
    const result = productValidation.safeParse(formData);
    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach((issue) => {
        errorMessage = errorMessage + ' ' + issue.message;
      });

      toast.error(errorMessage);
      return;
    }

    await createProduct(formData);
    toast.success('Producto agregado');
  };

  return (
    <form onSubmit={onAction} className={styles.form}>
      <input
        type='text'
        placeholder='Titulo'
        name='title'
        value={formData.title}
        onChange={handleChange}
        required
      />
      <select
        name='category'
        id='category'
        value={formData.cat}
        onChange={handleChange}
      >
        <option value='general'>Categoría</option>
        <option value='man'>Hombre</option>
        <option value='women'>Mujer</option>
      </select>
      <textarea
        required
        name='desc'
        id='desc'
        rows='16'
        placeholder='Descripción'
        value={formData.desc}
        onChange={handleChange}
      ></textarea>
      {variantCount < maxVariant && (
        <button
          type='button'
          className={styles.addVariantButton}
          onClick={addVariant}
        >
          Agregar Variante
        </button>
      )}
      {formData.variants.map((variant, index) => (
        <div key={index}>
          <input
            type='text'
            placeholder='Tamaño'
            name='size'
            value={variant.size}
            onChange={(e) => handleVariantChange(index, e)}
            required
          />
          <input
            type='number'
            placeholder='Precio'
            name='price'
            value={variant.price}
            onChange={(e) => handleVariantChange(index, e)}
            required
          />
          <input
            type='number'
            placeholder='Stock'
            name='stock'
            value={variant.stock}
            onChange={(e) => handleVariantChange(index, e)}
            required
          />
          <input
            type='file'
            name='img'
            accept='image/png, image/jpg'
            onChange={(e) => handleImageUpload(index, e.target.files[0])}
          />
          {variant.img && (
            <div>
              <Image src={variant.img} alt='' width={100} height={100} />
            </div>
          )}

          {index > 0 && (
            <button
              type='button'
              className={styles.addDeleteButton}
              onClick={() => removeVariant(index)}
            >
              Eliminar variante
            </button>
          )}
        </div>
      ))}
      <button type='submit' className={styles.submitButton}>
        Añadir
      </button>
    </form>
  );
};

export default AddProductForm;
