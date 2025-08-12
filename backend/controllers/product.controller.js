//premier Controller
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Erreur de telechargement des produits", error.message);
    res.status(500).json({ success: false, message: "Erreur du serveur" });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "tout les champs sont obligatoire",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Erreur de creation de produit", error.message);
    res.status(500).json({ sucess: false, message: "erreur du serveur" });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "produit bien supprimé" });
  } catch (error) {
    console.log("Erreur de suppression", error.message);
    res.status(400).json({ success: false, message: "produit non trouvé" });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, message: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
