import { useEffect, useState } from "react";
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="main_animes">
      {animes.map((anime) => (
        <Link to={`/anime/${anime.id}`} key={anime.id} className="card">
          <h2>{anime.title}</h2>

          <div className="container_img">
            <img
              src={`/img/${anime.img_src}`}
              alt="Fiche d'animes populaires tel que Drangon ball z, One Piece, Naruto, Hunter x Hunter, Berserk, GTO, Bleach, attaques des titans, Demon Slayers, Saint Seya"
              loading="lazy"
            />
          </div>

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
