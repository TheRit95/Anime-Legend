import { useState, useEffect } from "react";

export default function Comment({ animeId }) {
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0); // Note par défaut de 0
  const [hover, setHover] = useState(0); // Pour gérer l'état du survol

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_URL_BACKEND}/api/v1/animes/${animeId}/comments`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) throw "error";
        return response.json();
      })
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
  }, [animeId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    fetch(
      `${import.meta.env.VITE_URL_BACKEND}/api/v1/animes/${animeId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          user_name: userName,
          text: commentText,
          rating: rating, // Envoie la note à l'API
        }),
      }
    )
      .then((response) => {
        if (!response.ok) throw "error";
        return response.json();
      })
      .then((data) => {
        setComments([...comments, data]);
        setUserName(""); // Réinitialiser le champ du nom d'utilisateur
        setCommentText(""); // Réinitialiser le champ du commentaire
        setRating(0); // Réinitialiser la note
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="comment-section">
      <h3>Commentaires</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <small>Posté par: {comment.user_name}</small>
            <div>
              Note: {Array(comment.rating).fill("★").join("")}
              {Array(5 - comment.rating)
                .fill("☆")
                .join("")}
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Nom d'utilisateur"
          required
        />
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Ajouter un commentaire"
          required
        />

        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">★</span>
              </button>
            );
          })}
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
