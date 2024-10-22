import Client from "../model/client.js";
import multer from "multer";
import path from "path";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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

export const signUp = async (req, res) => {
  try {
    const { nom, numero, email, password } = req.body;
    const photo = req.file.path;

    const newClient = new Client({
      nom,
      numero,
      photo,
      email,
      password,
    });

    const savedClient = await newClient.save();
    res.status(200).json({ savedClient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const uploadMiddleware = upload.single("photo");

export const getAllClient = async (req, res) => {
  try {
    const getAllCli = await Client.find();
    res.status(200).json({ getAllCli });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getOneClient = async (id) => {
  try {
    const client = await Client.findById(id);
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const signin = async (req, res) => {
  const { nom, password } = req.body;

  try {
    const user = await Client.findOne({ nom });

    if (user && password === user.password) {
      res.status(200).json({
        _id: user._id,
        username: user.nom,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//fonctionalité restant :

export const singout = async (req, res) => {
  console.log("signout");
};
