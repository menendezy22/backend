import multer from "multer";
import path from "path";
import Produit from "../model/produit.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: fileFilter,
});

export const addProduit = async (req, res) => {
  try {
    const {  nom,
      quantite,
      price } = req.body;

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const photo = req.file.path;

    const newProduit = new Produit({
        nom,
        quantite,
      price,
      photo,
    });

    const savedProduit = await newProduit.save();
    res.status(200).json({ savedProduit });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const uploadMiddleware = upload.single("photo");

export const getAllProduit = async (req, res) => {
  try {
    const allProduits = await Produit.find();
    res.status(200).json({ allProduits });
  } catch (error) {
    res.status(500).send(error);
  }
};




export const getOneProduitsById = async (req, res) => {
  try {
    const produits = await Produit.findById(req.params.id);
    res.status(200).json({ produits });
  } catch (error) {
    res.status(500).send(error);
  }
};
export const deleteProduits = async (req, res) => {
  try {
    const Prod = await Produit.findByIdAndDelete(req.params.id);
    res.status(200).json({ Prod });
  } catch (error) {
    res.status(500).send(error);
  }
};
