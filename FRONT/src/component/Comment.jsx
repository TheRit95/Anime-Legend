import { useState, useEffect, useContext } from "react";
import { UserContext } from "../hooks/UserContextProvider";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export default function Comment({ animeId }) {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/comments/${animeId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur de récupération des commentaires");
        return response.json();
      })
      .then((data) => setComments(data))
      .catch((erreur) => toast.error(erreur.message));
  }, [animeId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    fetch(
      `${
        import.meta.env.VITE_URL_BACKEND
      }/api/v1/comments/addComment/${animeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          comment: commentText,
          rating: rating,
        }),
      }
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur lors de l'ajout du commentaire");
        return response.json();
      })
      .then(() => {
        setComments([
          ...comments,
          {
            comment: commentText,
            note: rating,
            id: Date.now(),
            username: user.username,
            statut: 1,
          },
        ]);
        setCommentText("");
        setRating(1);
        toast.success("Votre commentaire a bien été ajouté");
      })
      .catch(() => toast.error("Erreur lors de l'ajout du commentaire"));
  };

  const handleRemove = (commentId) => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "Erreur lors de la suppression du commentaire";
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== comment.id)
        );
        toast.success("Commentaire supprimé");
      })
      .catch(() => toast.error("Erreur lors de la suppression du commentaire"));
  };

  const handleReport = (commentId) => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur serveur");
        return response.json();
      })
      .then(() => {
        toast.success("Le commentaire a été signalé.");
        setComments((value) => value.filter((item) => item.id !== commentId));
      })
      .catch(() => {
        toast.error(
          "Une erreur s'est produite lors du signalement. Veuillez réessayer plus tard."
        );
      });
  };
  return (
    <div className="comment-section">
      <h3>Commentaires</h3>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Ajouter un commentaire"
          required
        />

        <div className="star-rating">
          <p className="star star-filled" onClick={() => setRating(1)}>
            ★
          </p>
          <p
            className={`star ${rating > 1 ? "star-filled" : ""}`}
            onClick={() => setRating(2)}
          >
            {rating > 1 ? "★" : "☆"}
          </p>
          <p
            className={`star ${rating > 2 ? "star-filled" : ""}`}
            onClick={() => setRating(3)}
          >
            {rating > 2 ? "★" : "☆"}
          </p>
          <p
            className={`star ${rating > 3 ? "star-filled" : ""}`}
            onClick={() => setRating(4)}
          >
            {rating > 3 ? "★" : "☆"}
          </p>
          <p
            className={`star ${rating > 4 ? "star-filled" : ""}`}
            onClick={() => setRating(5)}
          >
            {rating > 4 ? "★" : "☆"}
          </p>
        </div>

        {user?.email ? (
          <button type="submit">Envoyer</button>
        ) : (
          <p>Veuillez vous connecter</p>
        )}
      </form>

      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <p className="noteStar">
              {/* Affiche les étoiles pour la note du commentaire */}
              Note: {new Array(comment.note).fill("★").join("")}
              {new Array(5 - comment.note).fill("☆").join("")}
            </p>
            <p>{comment.comment}</p>
            <small>Posté par: {comment.username}</small>
            <div className="btn">
              <button onClick={() => handleReport(comment.id)}>Signaler</button>

              {comment.username === user.username && (
                <button onClick={() => handleRemove(comment.id)}>
                  Supprimer
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
