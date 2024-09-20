import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../component/Comment";
import toast from "react-hot-toast";

export default function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/animes/${id}`, {
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

      .then((data) => setAnime(data))
      .catch(() => toast.error("Erreur"));
  }, [id]);

  return (
    <main className="main_animes_details">
      <div className="container_img_detail">
        <img
          src={`/img/${anime.img_src}`}
          alt={
            anime.title ? `Image de l'anime ${anime.title}` : "Image d'anime"
          }
          loading="lazy"
        />
      </div>

      <div className="div_details">
        <h2>{anime.title}</h2>
        <h3>{anime.jap_title}</h3>
        <p>
          Genre:&nbsp;
          <b>
            <em>{anime.genre}</em>
          </b>
        </p>
        <p>
          Description: <br />
          {anime.description}
        </p>
        <p>
          Auteur:&nbsp;
          <b>
            <em>{anime.author_name}</em>
          </b>
        </p>
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
