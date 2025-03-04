import express from "express";

import {addProduct,listProducts,removeProduct,singleProduct} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
//import { isAdmin } from "../middlewares/admin.middleware.js";

const productRouter = express.Router();

productRouter.post("/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", listProducts);
productRouter.get("/single", singleProduct);
productRouter.delete("/remove", removeProduct);

export default productRouter;
