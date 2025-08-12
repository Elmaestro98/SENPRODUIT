import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { createProducts } from "../controllers/product.controller.js";
import { getProducts } from "../controllers/product.controller.js";
import { deleteProducts } from "../controllers/product.controller.js";
import { updateProducts } from "../controllers/product.controller.js";

export default router;

//Route pour Obtenir tout les produits
router.get("/", getProducts);

//route d ajout de produit
router.post("/", createProducts);

//Suppression de produit
router.delete("/:id", deleteProducts);

//modification dun produit
router.put("/:id", updateProducts);
