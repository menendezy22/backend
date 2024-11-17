import multer from "multer";
import path from "path";
import Produit from "../model/produit.js";
import fs from "fs";
import { fileURLToPath } from "url";

// Get the directory name from the current file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const { nom, quantite, price } = req.body;

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
    const produitId = req.params.id;

    if (!produitId) {
      return res.status(400).json({ message: "Produit ID is required" });
    }

    const produit = await Produit.findById(produitId);

    if (!produit) {
      return res.status(404).json({ message: "Produit not found" });
    }

    const photoPath = path.join(
      __dirname,
      "../uploads",
      path.basename(produit.photo)
    );

    fs.stat(photoPath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).json({ message: "Photo not found" });
      }

      fs.readFile(photoPath, (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Error reading photo" });
        }

        const photoBase64 = data.toString("base64");
        const photoBlob = `data:image/jpeg;base64,${photoBase64}`;

        res.status(200).json({
          produit,
          photo: photoBlob,
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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

export const updateProduit = async (req, res) => {
  try {
    // Extract user data from request body
    const { nom, price, quantite } = req.body;

    // Prepare updated user data
    const updatedData = {
      nom,
      price,
      quantite,
    };

    if (req.file) {
      updatedData.photo = req.file.path;
    }

    const produitId = req.params.id;

    // Find the user by ID
    const produit = await Produit.findById(produitId);

    // If the user is not found, respond with an error
    if (!produit) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user without changing the password
    await Produit.findByIdAndUpdate(produitId, updatedData, { new: true });

    // Respond with the updated user information
    res
      .status(200)
      .json({ message: "produit updated successfully", produit: updatedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
