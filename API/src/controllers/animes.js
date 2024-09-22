import Anime from "../model/Anime.js";

const getAll = async (_req, res) => {
  try {
    const animes = await Anime.getAll();
    res.json(animes);
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;

  try {
    const anime = await Anime.getOneById(id);

    if (anime.length > 0) {
      res.json(anime[0]);
    } else {
      res.status(404).json({ msg: "Anime non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

const add = async (req, res) => {
  const { title, description, genre, release_date, author_id } = req.body;

  try {
    await Anime.add([title, description, genre, release_date, author_id]);
    res.json({ msg: `Anime bien ajouté` });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const response = await Anime.update(req.body, req.params.id);

    if (response[0].affectedRows > 0 && response[1].affectedRows > 0) {
      res.json({ msg: `Anime bien mis à jour` });
    } else {
      res.status(404).json({ msg: "Anime non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Anime.remove(id);

    if (response.affectedRows > 0) {
      res.json({ msg: `Anime bien supprimé` });
    } else {
      res.status(404).json({ msg: "Anime non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

export { getAll, add, getOneById, update, remove };
