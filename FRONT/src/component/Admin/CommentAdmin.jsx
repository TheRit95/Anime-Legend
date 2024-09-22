import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CommentAdmin() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/admin/reported`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "Vous n'êtes pas autorisé";
        return response.json();
      })
      .then((data) => {
        setComments(data);
      })

      .catch(() => toast.error("Erreur lors de la récupération des animes"));
  }, []);

  const handleDeleteComment = (commentId) => {
    fetch(
      `${
        import.meta.env.VITE_URL_BACKEND
      }/api/v1/admin/comment/delete/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) throw "Erreur lors de la suppression du commentaire";
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        toast.success("Commentaire supprimé");
      })
      .catch(() => toast.error("Erreur lors de la suppression du commentaire"));
  };

  const handlePublish = (commentId) => {
    fetch(
      `${
        import.meta.env.VITE_URL_BACKEND
      }/api/v1/admin/comment/publish/${commentId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok)
          throw "Erreur lors de la republication du commentaire";
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
        toast.success("Commentaire reposté");
      })
      .catch(() =>
        toast.error("Erreur lors de la republication du commentaire")
      );
  };

  const handleBanUser = (userId) => {
    fetch(
      `${import.meta.env.VITE_URL_BACKEND}/api/v1/admin/user/ban/${userId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok)
          throw "Erreur lors de la suppression de l'utilisateur";

        toast.success("user banni ");
      })
      .catch(() => toast.error("Erreur"));
  };

  return (
    <section className="comment-management">
      <h2>Gestion des Commentaires et Utilisateurs</h2>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>{comment.title}</p>
            <p>
              <strong>Posté par :</strong> {comment.username}
            </p>

            <button
              className="publish-button"
              onClick={() => handlePublish(comment.id)}
            >
              Remettre en ligne
            </button>

            <button
              className="delete-button"
              onClick={() => handleDeleteComment(comment.id)}
            >
              Supprimer
            </button>

            <button
              className="ban-button"
              onClick={() => handleBanUser(comment.user_id)}
            >
              Bannir Utilisateur
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
