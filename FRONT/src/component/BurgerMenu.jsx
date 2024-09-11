import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContextProvider";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function BurgerMenu({ setIsOpenBurger }) {
  // Accès au contexte utilisateur
  const user = useContext(UserContext);

  // Fonction appelée lors de la déconnexion
  const handleLogout = (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    setIsOpenBurger(false); // Ferme le menu burger

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/logout`, {
      method: "GET", // Méthode HTTP GET pour la déconnexion
      headers: {
        Accept: "application/json", // En-tête pour indiquer que la réponse attendue est en JSON
      },
      credentials: "include", // Inclut les cookies dans la requête
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur de déconnexion"); // Gère les erreurs de réponse
        return response.json(); // Convertit la réponse en JSON
      })
      .then(() => user.setUser({})); // Réinitialise l'utilisateur dans le contexte
  };

  return (
    <div className="BurgerMenu">
      <nav>
        {/* Liens de navigation */}
        <Link to="/" onClick={() => setIsOpenBurger(false)}>
          Accueil
        </Link>
        <Link to="/anime" onClick={() => setIsOpenBurger(false)}>
          Anime
        </Link>

        {/* Affiche les liens de connexion/inscription si l'utilisateur n'est pas connecté */}
        {!user?.email ? (
          <>
            <Link to="/login" onClick={() => setIsOpenBurger(false)}>
              Connexion
            </Link>
            <Link to="/register" onClick={() => setIsOpenBurger(false)}>
              Inscription
            </Link>
          </>
        ) : (
          // Affiche le lien de déconnexion si l'utilisateur est connecté
          <Link to="" onClick={handleLogout}>
            Déconnexion
          </Link>
        )}
      </nav>
    </div>
  );
}
