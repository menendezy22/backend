import multer from "multer";
import path from "path";
import Lot from "../model/lot.js";

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

export const addLot = async (req, res) => {
  try {
    const { designLot, numero, description, isOccuped } = req.body;
    const photo = req.file.path;

    const newLot = new Lot({
      designLot,
      numero,
      description,
      isOccuped,
      photo,
    });

    const savedLot = await newLot.save();
    res.status(200).json({ savedLot });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const uploadMiddleware = upload.single("photo");

export const getAllLot = async (req, res) => {
  try {
    const allLots = await Lot.find();
    res.status(200).json({ allLots });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getOneLotById = async (id) => {
  try {
    const lot = await Lot.findById(id);
    res.status(200).json({ lot });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteLot = async (req, res) => {
  try {
    const lot = await Lot.findByIdAndDelete(req.params.id);
    res.status(200).json({ lot });
  } catch (error) {
    res.status(500).send(error);
  }
};
