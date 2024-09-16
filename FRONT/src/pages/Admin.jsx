import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContextProvider";
import { toast } from "react-hot-toast";
import "../assets/styles/admin.scss";

export default function Admin() {
  const [comments, setComments] = useState([]);
  const users = useContext(UserContext);

  // Récupération des données des animes
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/admin/reported`, {
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

  // Fonction pour supprimer un commentaire
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

  // Fonction pour remettre en ligne un commentaire
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

  // Fonction pour bannir un utilisateur
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

  if (!users || users?.isAdmin === 0) {
    window.location.href = "/";
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="admin-panel">
      <h1>Panneau d&apos;administration</h1>

      <img
        src="http://mangapournous.m.a.pic.centerblog.net/chaos-head.gif"
        border="0"
        alt="Image animé d'une personne qui ecrit au clavier"
      />

      {/* Gestion des Commentaires */}
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

      <button className="scroll-top" onClick={scrollToTop}>
        ↑
      </button>
    </main>
  );
}
