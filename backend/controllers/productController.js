import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// import createError from "http-errors";
// import { successResponse } from "./response.controller.js";
import mongoose from "mongoose";

//add product
const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller} = req.body; 
    const image1 =  req.files.image1[0];
    const image2 =  req.files.image2[0];
    const image3 =  req.files.image3[0];
    const image4 =  req.files.image4[0];

    console.log(name, description, price, category, subCategory, sizes, bestseller)
    console.log(image1 , image2 ,image3, image4);

    res.json({})
    
    

//     const images = [image1, image2, image3, image4].filter(
//       (img) => img !== undefined
//     );

//     const forever = `product/${category}`;

//     let imagesURL = await Promise.all(
//       images.map(async (img) => {
//         let result = await cloudinary.uploader.upload(img.path, {
//           resource_type: "image",
//           folder: forever,
//         });

//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       price: Number(price),
//       category,
//       subCategory,
//       sizes: JSON.parse(sizes),
//       bestseller: bestseller === "true" ? true : false,
//       image: imagesURL,
//       date: Date.now(),
//     };

//     const product = await productModel.create(productData);

//     if (!product) {
//       throw createError(404, "Product not found");
//     }

//     return successResponse(res, {
//       statusCode: 200,
//       message: "Product was added successfully",
//     });
  } catch (error) {
    console.log(error);
   res.json({success:false, message: error.message})
  }
};

//get all product
const listProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();

    if (!products || products.length === 0) {
      throw createError(404, "No products found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "All product was returend successfully",
      payload: products,
    });
  } catch (error) {
    next(error);
  }
};

//remove product
const removeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(400, "Invalid mongoose id");
    }

    const product = await productModel.findOneAndDelete(id);

    if (!product) {
      throw createError(404, "Product not found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "product was removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

//get single product
const singleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(400, "Invalid mongoose id");
    }

    const product = await productModel.findById(id);

    if (!product) {
      throw createError(404, "Product not found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "product was returned successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {addProduct,listProducts,removeProduct,singleProduct};
