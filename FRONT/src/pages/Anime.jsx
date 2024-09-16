import { useEffect, useState } from "react";
import "../../src/assets/styles/anime.scss";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Anime() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/animes`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "error";
        return response.json();
      })

      .then((data) => setAnimes(data))
      .catch((err) => toast.error(err.message));
  }, []);

  // Fonction pour faire défiler la page vers le haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="main_animes">
      {/* Parcours de la liste des animes et création d'une carte pour chaque anime */}
      {animes.map((anime) => (
        <Link to={`/anime/${anime.id}`} key={anime.id} className="card">
          {/* Affichage du titre de l'anime */}
          <p>{anime.title}</p>
          {/* Affichage de l'image de l'anime */}
          <img
            src={`${import.meta.env.VITE_URL_BACKEND}/img/${anime.img_src}`}
            alt="Fiche d'anime populaires tel que Drangon ball z, One Piece, Naruto, Hunter x Hunter, Berserk, GTO, Bleach, attaques des titans, Demon Slayers, Saint Seya"
          />
          {/* Affichage du genre, de la date de sortie et de l'auteur */}
          <p>{anime.genre}</p>
          <p>Sortie le {new Date(anime.release_date).toLocaleDateString()}</p>
          <p>{anime.author_name}</p>
        </Link>
      ))}

      <button className="scroll-top" onClick={scrollToTop}>
        ↑
      </button>
    </main>
  );
}
