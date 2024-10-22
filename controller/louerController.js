import Louer from "../model/louer.js";

export const addLoyer = async (req, res) => {
  try {
    const { idCli, idLot, loyer } = req.body;
    const newLouer = new Louer({
      idCli,
      idLot,
      loyer,
    });

    const savedLouer = await newLouer.save();
    res.status(200).json({ savedLouer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLouer = async (req, res) => {
  try {
    const allLouer = await Louer.find();
    res.status(200).json({ allLouer });
  } catch (error) {
    res.status(500).send(error);
  }
};
