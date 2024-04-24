'use client'

import { useState } from 'react';
import styles from '@/app/components/products/addProduct/addProduct.module.css';
import { createProduct } from '@/app/utils/formProductActions';
import { productValidation } from '@/app/utils/validations';
import toast from 'react-hot-toast';
import { maxVariant, minVariant } from '@/app/constants/variantsAmount';

const AddProductForm = () => {
  const [variantCount, setVariantCount] = useState(minVariant);
  const [formData, setFormData] = useState({
    title: '',
    category: 'general',
    desc: '',
    variants: [{ size: '', price: 0, stock: 0, img: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...formData.variants];
    newVariants[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      variants: newVariants
    }));
  };

  const addVariant = () => {
    if (variantCount < maxVariant) {
      setVariantCount(variantCount + 1);
      setFormData((prevData) => ({
        ...prevData,
        variants: [...prevData.variants, { size: '', price: 0, stock: 0, img: '' }]
      }));
    }
  };

  const removeVariant = (index) => {
    if (variantCount > 1) {
      setVariantCount(variantCount - 1);
      const newVariants = [...formData.variants];
      newVariants.splice(index, 1);
      setFormData((prevData) => ({
        ...prevData,
        variants: newVariants
      }));
    }
  };

  const onAction = async () => {
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
    <form action={onAction} className={styles.form}>
      <input type='text' placeholder='Titulo' name='title' value={formData.title} onChange={handleChange} required />
      <select name='category' id='category' value={formData.cat} onChange={handleChange}>
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
      {variantCount < maxVariant && <button type='button' className={styles.addVariantButton} onClick={addVariant}>Agregar Variante</button>}
      {formData.variants.map((variant, index) => (
        <div key={index}>
          <input type='text' placeholder='Tamaño' name='size' value={variant.size} onChange={(e) => handleVariantChange(index, e)} required/>
          <input type='number' placeholder='Precio' name='price' value={variant.price} onChange={(e) => handleVariantChange(index, e)} required/>
          <input type='number' placeholder='Stock' name='stock' value={variant.stock} onChange={(e) => handleVariantChange(index, e)} required/>
          <input type='text' placeholder='URL de imagen' name='img' value={variant.img} onChange={(e) => handleVariantChange(index, e)} />
          {index > 0 && <button type='button' className={styles.addDeleteButton} onClick={() => removeVariant(index)}>Eliminar variante</button>}
        </div>
      ))}
      <button type='submit' className={styles.submitButton}>Añadir</button>
    </form>
  );
};

export default AddProductForm;
