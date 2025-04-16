import productService from "../services/product.service.js";

class ProductControllers {
  async createProduct(req, res) {
    try {
      const { name, price, description, category } = req.body;

      //check if product name is already exist
      const existingProduct = productService.getProductByname(name);
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: `product ${name} is already exist` });
      }

      // Adding validation to all required fields
      if (!name || !price || !description || !category) {
        return res.status(400).json({ message: "All field are required" });
      }

      const product = await productService.createProduct(req.body);
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
  async getAllProducts(res) {
    try {
      const products = productService.getAllProducts();
      return res.status(200).json({
        success: true,
        message: "Product data fetched successful",
        data: products,
      });
    } catch (error) {
      console.log("Error in returning products", error.message);
    }
  }
}

export default new ProductControllers();
