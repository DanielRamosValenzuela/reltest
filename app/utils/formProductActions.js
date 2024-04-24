'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { connectToDB } from '../lib/connection';
import { Product } from '../models/product';

export const createProduct = async (formData) => {
  const { title, desc, category, variants} = formData;

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      desc,
      category,
      variants
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to create product!');
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};
