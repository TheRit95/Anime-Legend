import { useEffect, useState } from "react";
import "../../src/assets/styles/anime.scss";
import { Link } from "react-router-dom";

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
      .catch((err) => console.log(err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log(animes);

  return (
    <main className="main_animes">
      {animes.map((anime) => (
        <Link to={`/anime/${anime.id}`} key={anime.id} className="card">
          <p>{anime.title}</p>
          <img
            src={`${import.meta.env.VITE_URL_BACKEND}/img/${anime.img_src}`}
            alt="Fiche d'anime populaires tel que Drangon ball z, One Piece, Naruto, Hunter x Hunter, Berserk, GTO, Bleach, attaques des titans, Demon Slayers, Saint Seya"
          />
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
