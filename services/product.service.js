import Product from "../models/product.models.js";

class ProductService {
  async createProduct(productData) {
    try {
      const product = await Product(productData);
      return product.save();
    } catch (error) {
      throw new Error("Error creating product:" + error.message);
    }
  }

  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error("error getting products:" + error.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      throw new Error("error in getting this product", error.message);
    }
  }

  async getProductByname(name) {
    try {
      const product = await Product.findOne({ name });
      return product;
    } catch (error) {
      throw new Error("error in finding product by name", error.name);
    }
  }
}

export default new ProductService();
