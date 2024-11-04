import multer from "multer";
import path from "path";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import fs from "fs";

import { fileURLToPath } from "url";

// Get the directory name from the current file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const addUser = async (req, res) => {
  try {
    const { nom, prenom, adresse, phone, email, nifstat, cin, hash } = req.body;

    const photo = req.file.path;

    const password = await bcrypt.hash(hash, 10);

    const newUser = new User({
      nom,
      prenom,
      photo,
      adresse,
      phone,
      email,
      nifstat,
      cin,
      password,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ savedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const uploadMiddleware = upload.single("photo");
export const getAllUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ deletedUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const singin = async (req, res) => {
  try {
    // Validate email and password (optional)

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return a standardized successful response
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const photoPath = path.join(
      __dirname,
      "../uploads",
      path.basename(user.photo)
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
          user,
          photo: photoBlob,
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { nom, prenom, adresse, phone, email, nifstat, cin } = req.body;

    // Prepare updated user data
    const updatedData = {
      nom,
      prenom,
      adresse,
      phone,
      email,
      nifstat,
      cin,
    };

    // Check if a new photo file is uploaded
    if (req.file) {
      updatedData.photo = req.file.path; // Update the photo path if a new file is uploaded
    }

    // Get the user ID from the URL parameters
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    // If the user is not found, respond with an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user without changing the password
    await User.findByIdAndUpdate(userId, updatedData, { new: true });

    // Respond with the updated user information
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
