import ProductService from "../services/product.service.js";

class ProductControllers {
  async createProduct(req, res) {
    try {
      const { name, description, price, category } = req.body || {};

      //check if product name is already exist
      const existingProduct = await ProductService.getProductByname(name);
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: `product ${name} is already exist` });
      }

      // Adding validation to all required fields
      if (!name || !price || !description || !category) {
        return res.status(400).json({ message: "All field are required" });
      }

      const product = await ProductService.createProduct(req.body);
      return res.status(201).json({
        success: true,
        message: "Product created successful",
        product,
      });
    } catch (error) {
      console.error("Error Creating Product", error.message);
      res.status(500).json({ message: "Internal Server error" });
    }
  }

  //   Get all product
  async getAllProducts({ res }) {
    try {
      const products = await ProductService.getAllProducts();
      return res.status(200).json({
        success: true,
        message: "Product data fetched successful",
        data: products,
      });
    } catch (error) {
      console.log("Error in returning products", error.message);
    }
  }

  async getProductById({ params: { id }, res }) {
    try {
      // check if product id is valid or not
      if (!id) {
        return res.status(400).json({ message: "Product id is required" });
      }
      const product = await ProductService.getProductById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Product data fetched successful",
        product,
      });
    } catch (error) {}
  }
}

export default new ProductControllers();
