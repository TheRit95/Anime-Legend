// Importation des hooks useEffect et useState de React
import { useEffect, useState } from "react";

// Importation des styles pour les animes
import "../../src/assets/styles/anime.scss";

// Importation de Link depuis react-router-dom pour la navigation entre les pages
import { Link } from "react-router-dom";

// Déclaration du composant Anime
export default function Anime() {
  // Déclaration de l'état animes pour stocker la liste des animes
  const [animes, setAnimes] = useState([]);

  // useEffect pour exécuter la récupération des animes après le rendu initial
  useEffect(() => {
    // Récupération des données d'animes depuis l'API
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/animes`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        // Gestion des erreurs si la réponse n'est pas correcte
        if (!response.ok) throw "error";
        return response.json();
      })
      // Mise à jour de l'état animes avec les données récupérées
      .then((data) => setAnimes(data))
      // Gestion des erreurs lors de la récupération
      .catch((err) => console.log(err));
  }, []); // Le tableau vide [] signifie que le useEffect s'exécute uniquement lors du montage du composant

  // Fonction pour faire défiler la page vers le haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Affichage de la liste des animes dans la console pour débogage
  console.log(animes);

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

      {/* Bouton pour faire défiler la page vers le haut */}
      <button className="scroll-top" onClick={scrollToTop}>
        ↑
      </button>
    </main>
  );
}
