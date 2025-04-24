// import mongoose from "mongoose";

// const productSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     maxlength: [100, "Product name cannot exceed 100 characters"],
//   },

//   description: {
//     type: String,
//     required: true,
//     unique: false,
//     maxlength: [500, "Product description cannot exceed 500 characters"],
//   },

//   price: {
//     type: Number,
//     required: true,
//     unique: false,
//     min: [0, "Product price cannot be negative"],
//   },
//   category: {
//     type: String,
//     required: true,
//     enum: {
//       values: ["electronics", "clothing", "books"],
//     },
//   },
//   inStock: {
//     type: Boolean,
//     default: true,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updateAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const product = mongoose.model("Product", productSchema);

// export default product;
