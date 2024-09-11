import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../component/Comment";

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
      .catch((err) => console.log(err));
  }, [id]);
  console.log(anime);

  return (
    <main className="main_animes_details">
      <img src={`${import.meta.env.VITE_URL_BACKEND}/img/${anime.img_src}`} />

      <div className="div_details">
        <h2>{anime.title}</h2>
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

      {/* <div className="rating-and-comments">
        <StarRating rating={rating} setRating={setRating} />{" "}
        
        <Comment animeId={id} />
      </div> */}

      <Comment />
    </main>
  );
}
