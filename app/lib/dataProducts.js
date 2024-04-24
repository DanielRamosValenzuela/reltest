import { ITEM_PER_PAGE } from '../constants/itemsPerPage';
import { Product } from '../models/product';
import { connectToDB } from './connection';

export const getProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get products!");
  }
};;

export const getProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};
