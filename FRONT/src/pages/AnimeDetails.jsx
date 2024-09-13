// Importation des hooks useEffect et useState de React
import { useEffect, useState } from "react";

// Importation de useParams depuis react-router-dom pour obtenir les paramètres de l'URL
import { useParams } from "react-router-dom";

// Importation du composant Comment pour gérer les commentaires liés à l'anime
import Comment from "../component/Comment";

// Déclaration du composant AnimeDetails
export default function AnimeDetails() {
  // Extraction de l'ID de l'anime depuis les paramètres de l'URL
  const { id } = useParams();

  // Déclaration de l'état anime pour stocker les détails de l'anime
  const [anime, setAnime] = useState([]);

  // useEffect pour récupérer les détails de l'anime lorsque le composant est monté
  useEffect(() => {
    // Récupération des données détaillées de l'anime depuis l'API
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/animes/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        // Vérification si la réponse est correcte
        if (!response.ok) throw "error";
        return response.json();
      })
      // Mise à jour de l'état anime avec les données récupérées
      .then((data) => setAnime(data))
      // Gestion des erreurs lors de la récupération
      .catch((err) => console.log(err));
  }, [id]); // Le useEffect se réexécute à chaque changement de l'ID dans l'URL

  return (
    <main className="main_animes_details">
      {/* Affichage de l'image de l'anime */}
      <img src={`${import.meta.env.VITE_URL_BACKEND}/img/${anime.img_src}`} />

      <div className="div_details">
        {/* Affichage du titre de l'anime */}
        <h2>{anime.title}</h2>

        {/* Affichage du genre de l'anime */}
        <p>
          Genre:&nbsp;
          <b>
            <em>{anime.genre}</em>
          </b>
        </p>

        {/* Affichage de la description de l'anime */}
        <p>
          Description: <br />
          {anime.description}
        </p>

        {/* Affichage du nom de l'auteur */}
        <p>
          Auteur:&nbsp;
          <b>
            <em>{anime.author_name}</em>
          </b>
        </p>

        {/* Affichage de la biographie de l'auteur */}
        <p>
          Biographie:
          <br />
          {anime.bio}
        </p>
      </div>

      {/* Intégration du composant Comment pour afficher et gérer les commentaires liés à cet anime */}
      <Comment animeId={id} />
    </main>
  );
}
