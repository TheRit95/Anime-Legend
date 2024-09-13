import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/admin.scss";
import { toast } from "react-hot-toast";
import { UserContext } from "../hooks/UserContextProvider";

export default function Admin() {
  const [comments, setComments] = useState([]);
  const users = useContext(UserContext);

  // Récupération des données des animes
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/admin/report`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch(() => toast.error("Erreur lors de la récupération des animes"));
  }, []);

  // Récupération des données des utilisateurs

  // Récupération des commentaires

  // Fonction pour supprimer un commentaire
  const handleDeleteComment = (commentId) => {
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
          prevComments.filter((comment) => comment.id !== commentId)
        );
        toast.success("Commentaire supprimé");
      })
      .catch(() => toast.error("Erreur lors de la suppression du commentaire"));
  };

  if (!users || users?.isAdmin === 0) {
    window.location.href = "/";
  }

  console.log(comments);

  return (
    <main className="admin-panel">
      <h1>Panneau d&apos;administration</h1>

      {/* Gestion des Animes */}
      <section className="anime-management">
        <h2>Gestion des Animes</h2>
        <Link to="/admin/anime/new" className="button">
          Ajouter un anime
        </Link>
        <ul></ul>
      </section>

      {/* Gestion des Commentaires */}
      <section className="comment-management">
        <h2>Gestion des Commentaires</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>
                <strong>Posté par :</strong> {comment.username} -{" "}
              </p>
              <button
                className="delete-button"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Supprimer
              </button>

              <button
                className="delete-button"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Bannir
              </button>

              <button
                className="delete-button"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Remettre en ligne
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
