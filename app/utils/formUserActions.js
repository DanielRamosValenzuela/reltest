'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { connectToDB } from '../lib/connection';

//TODO: Falta validación si el usuario ya existe

export const createUser = async (formData) => {
  const {
    username,
    email,
    password,
    phone,
    address,
    number,
    details,
    isAdmin,
    isActive,
  } = formData;

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      number,
      details,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error('Failed to create user!');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete user!');
  }

  revalidatePath('/dashboard/products');
};

export const updateUser = async (formData) => {
  const {
    username,
    email,
    password,
    phone,
    address,
    number,
    details,
    isAdmin,
    isActive,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateFields = {
      username,
      email,
      password: hashedPassword,
      phone,
      number,
      details,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === '' || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update user!');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
};
