import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TableAnimeAdmin() {
  const [animes, setAnimes] = useState([]);
  const [editingAnimeId, setEditingAnimeId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    jap_title: "",
    img_src: "",
    description: "",
    genre: "",
    author_name: "",
    author_id: "",
    release_date: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/animes`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "Vous n'êtes pas autorisé";
        return response.json();
      })
      .then((data) => {
        setAnimes(data);
      })

      .catch(() => toast.error("Erreur lors de la récupération des animes"));
  }, []);

  const handleUpdate = (animeId) => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/animes/${animeId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw "Erreur lors de l'édition de l'anime";
        return response.json();
      })

      .then(() => {
        setAnimes((prevAnimes) =>
          prevAnimes.map((anime) => (anime.id === animeId ? formData : anime))
        );
        setEditingAnimeId(null);
        toast.success("Anime édité avec succès");
      })
      .catch(() => toast.error("Erreur lors de l'édition de l'anime"));
  };

  const handleDelete = (animeId) => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/animes/${animeId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "Erreur lors de la suppression de l'anime";
        setAnimes((prevAnimes) =>
          prevAnimes.filter((anime) => anime.id !== animeId)
        );
        toast.success("Anime supprimé");
      })
      .catch(() => toast.error("Erreur lors de la suppression de l'anime"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = (anime) => {
    setEditingAnimeId(anime.id);
    setFormData({
      id: anime.id,
      title: anime.title,
      jap_title: anime.jap_title,
      img_src: anime.img_src,
      description: anime.description,
      genre: anime.genre,
      author_name: anime.author_name,
      author_id: anime.author_id,
      release_date: anime.release_date
        ? new Date(anime.release_date).toISOString().split("T")[0]
        : "",
    });
  };

  return (
    <>
      <h2>Gestion des Animes</h2>
      <table>
        <thead>
          <tr>
            <th>Animes</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {animes.map((anime) => (
            <tr key={anime.id}>
              <td>
                {editingAnimeId === anime.id ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ""}
                      onChange={handleInputChange}
                      placeholder="Titre"
                    />
                    <input
                      type="text"
                      name="jap_title"
                      value={formData.jap_title || ""}
                      onChange={handleInputChange}
                      placeholder="Titre Japonais"
                    />
                    <input
                      type="text"
                      name="img_src"
                      value={formData.img_src || ""}
                      onChange={handleInputChange}
                      placeholder="URL de l'image"
                    />
                    <input
                      type="text"
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      name="genre"
                      value={formData.genre || ""}
                      onChange={handleInputChange}
                      placeholder="Genre"
                    />

                    <input
                      type="text"
                      name="author_name"
                      value={formData.author_name || ""}
                      onChange={handleInputChange}
                      placeholder="author_name"
                    />
                    <input
                      type="date"
                      name="release_date"
                      value={formData.release_date || ""}
                      onChange={handleInputChange}
                      placeholder="Date de sortie"
                    />
                  </div>
                ) : (
                  <p>{anime.title}</p>
                )}
              </td>
              <td>
                {editingAnimeId === anime.id ? (
                  <>
                    <button onClick={() => handleUpdate(anime.id)}>
                      Sauvegarder
                    </button>
                    <button onClick={() => setEditingAnimeId(null)}>
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(anime)}>
                      Éditer
                    </button>
                    <button onClick={() => handleDelete(anime.id)}>
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
