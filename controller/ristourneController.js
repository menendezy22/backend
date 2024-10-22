import Ristourne from "../model/Ristourne.js";
import Commande from "../model/commandes.js";

export const addRistourne = async (req, res) => {
  try {
    const { remise, commande_id } = req.body;

    console.log(commande_id, "ez");

    const commande = await Commande.findById(commande_id);

    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    let reduction = (parseFloat(commande.prix_total) / 100) * remise;

    commande.prix_total -= reduction;

    if (commande.prix_total < 0) commande.prix_total = 0;

    await commande.save();

    const ristourne = new Ristourne({
      commande_id,
      remise,
      reduction,
    });

    const savedRistourne = await ristourne.save();

    res.status(201).json({ savedRistourne, commande });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRistournesByClient = async (req, res) => {
  // Récupérer toutes les ristournes d'un client
  try {
    const ristournes = await Ristourne.find({ client_id: req.params.client_id })
      .populate("client_id", "nom prenom")
      .populate("commande_id", "ref_commande montant_total");

    res.status(200).json(ristournes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
