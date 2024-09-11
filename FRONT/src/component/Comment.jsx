import { useState, useEffect, useContext } from "react";
import { UserContext } from "../hooks/UserContextProvider";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export default function Comment({ animeId }) {
  const [comments, setComments] = useState([]); // État pour stocker les commentaires
  const user = useContext(UserContext); // Contexte utilisateur pour vérifier l'authentification
  const [commentText, setCommentText] = useState(""); // État pour stocker le texte du commentaire
  const [rating, setRating] = useState(1); // État pour stocker la note (par défaut 1)

  // Console log pour le débogage
  console.log(user);

  // Récupère les commentaires au chargement du composant ou lorsque animeId change
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
      .then((data) => setComments(data)) // Met à jour l'état avec les commentaires récupérés
      .catch((err) => console.log(err)); // Affiche les erreurs éventuelles
  }, [animeId]);

  // Fonction appelée lors de la soumission du formulaire
  const handleCommentSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

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
          rating: rating, // Envoie la note avec le commentaire
        }),
      }
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur lors de l'ajout du commentaire");
        return response.json();
      })
      .then(() => {
        // Met à jour la liste des commentaires après l'ajout
        setComments([
          ...comments,
          {
            comment: commentText,
            note: rating,
            id: Date.now(), // Utilisation de la date pour générer un ID unique
            username: user.username,
            statut: 1,
          },
        ]);
        setCommentText(""); // Réinitialise le champ de texte du commentaire
        setRating(1); // Réinitialise la note
        toast.success("Votre commentaire a bien été ajouté"); // Affiche un message de succès
      })
      .catch(() => toast.error("Erreur lors de l'ajout du commentaire")); // Affiche un message d'erreur
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
          {/* Affiche les étoiles pour la note */}
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
          <button type="submit">Envoyer</button> // Affiche le bouton d'envoi si l'utilisateur est connecté
        ) : (
          <p>Veuillez vous connecter</p> // Message demandant à l'utilisateur de se connecter s'il ne l'est pas
        )}
      </form>

      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <small>Posté par: {comment.username}</small>
            <div>
              {/* Affiche les étoiles pour la note du commentaire */}
              Note: {new Array(comment.note).fill("★").join("")}
              {new Array(5 - comment.note).fill("☆").join("")}
            </div>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
