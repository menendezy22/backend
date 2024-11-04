import Commande from "../model/commandes.js";
import Produit from "../model/produit.js";
import User from "../model/user.js";
import multer from "multer";
import path from "path";
import Ristourne from "../model/Ristourne.js";

export const addCommande = async (req, res) => {
  try {
    const { user_id, produit_id, quantite, status = "pending" } = req.body;

    const produit = await Produit.findById(produit_id);

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    if (produit.quantite < quantite) {
      return res
        .status(400)
        .json({ message: "Quantité insuffisante pour ce produit" });
    }

    const prix_total = produit.price * quantite;

    produit.quantite -= quantite;

    await produit.save();

    const newCommande = new Commande({
      user_id,
      produit_id,
      quantite,
      status,
      prix_total,
    });

    const savedCommande = await newCommande.save();

    res.status(201).json({ savedCommande });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCommandeStatus = async (req, res) => {
  // maj du statut de la commande
  try {
    const { status } = req.body; // Le nouveau statut de la commande

    const validStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    commande.status = status;
    const updatedCommande = await commande.save();

    res.status(200).json({ updatedCommande });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCommande = async (req, res) => {
  // recuperer toutes les commandes
  try {
    const commandes = await Commande.find()
      .populate("user_id")
      .populate("produit_id");

    res.status(200).json({ commandes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id)
      .populate("user_id")
      .populate("produits.produit_id");

    if (!commande) {
      return res.status(400).json({ message: "Commande non trouvée" });
    }

    res.status(200).json({ commande });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCommande = async (req, res) => {
  // Supprimer une commande
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);

    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//function mampiditra sary

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

export const uploadMiddleware = upload.single("photo");

export const getAllUserWithAllCommandsMade = async (req, res) => {
  try {
    const usersWithCommands = await Commande.aggregate([
      // Step 1: Match commands with status "confirmed"
      {
        $match: {
          status: "confirmed", // Filter for confirmed commands
        },
      },
      // Step 2: Group by user_id and count commands
      {
        $group: {
          _id: "$user_id", // Group by user_id
          totalCommands: { $sum: 1 }, // Count the number of commands for each user
        },
      },
      // Step 3: Lookup user details
      {
        $lookup: {
          from: "users", // The User collection
          localField: "_id", // _id in this aggregation is user_id
          foreignField: "_id", // _id field in the User collection
          as: "userDetails", // Populate user details in this field
        },
      },
      // Step 4: Unwind userDetails array to flatten the result
      {
        $unwind: "$userDetails",
      },
      // Optional Step 5: Project (select) the fields we want in the final output
      {
        $project: {
          _id: 0,
          user_id: "$_id",
          totalCommands: 1,
          "userDetails.nom": 1,
          "userDetails.email": 1,
          "userDetails.prenom": 1,
          "userDetails.photo": 1,
        },
      },
    ]);

    res.status(200).json(usersWithCommands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCommandesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const commandes = await Commande.find({
      user_id: userId,
      status: "confirmed", // Filter for confirmed commands
    })
      .populate("produit_id")
      .populate("user_id")
      .lean();

    const commandesWithRistourne = await Promise.all(
      commandes.map(async (commande) => {
        const ristourne = await Ristourne.findOne({
          commande_id: commande._id,
        }).lean();
        return {
          ...commande,
          ristourne: ristourne ? ristourne.remise : null,
        };
      })
    );

    return res.status(200).json(commandesWithRistourne);
  } catch (error) {
    console.error("Error fetching commandes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDataForChart = async (req, res) => {
  // recuperer toutes les commandes
  try {
    const commandes = await Commande.find();

    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
