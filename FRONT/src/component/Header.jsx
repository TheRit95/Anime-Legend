import { useContext, useState } from "react"; // Importation des hooks React
import { Link } from "react-router-dom"; // Importation du composant Link pour la navigation
import { UserContext } from "../hooks/UserContextProvider"; // Importation du contexte utilisateur
import BurgerIcon from "./BurgerIcon"; // Importation du composant BurgerIcon
import BurgerMenu from "./BurgerMenu"; // Importation du composant BurgerMenu

export default function Header() {
  const user = useContext(UserContext); // Récupération des informations utilisateur depuis le contexte
  const [isOpenBurger, setIsOpenBurger] = useState(false); // État pour gérer l'ouverture/fermeture du menu burger

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "error"; // Gestion des erreurs
        return response.json();
      })
      .then(() => user.setUser({})); // Réinitialisation de l'état utilisateur après déconnexion
  };

  // Fonction pour gérer l'ouverture/fermeture du menu burger
  const handleBurger = () => {
    setIsOpenBurger((value) => !value);
  };

  return (
    <header>
      <h1>Anime-Legend</h1>
      <BurgerIcon className="BurgerIcon" onClick={handleBurger} />{" "}
      {isOpenBurger && <BurgerMenu setIsOpenBurger={setIsOpenBurger} />}
      <nav>
        {user?.isAdmin && <Link to="/admin">Admin</Link>}

        <Link to="/">Accueil</Link>
        <Link to="/anime">Anime</Link>
        {!user?.email ? (
          <>
            <Link to="/login">Connexion</Link>{" "}
            <Link to="/register">Inscription</Link>{" "}
          </>
        ) : (
          <Link to="" onClick={handleLogout}>
            {" "}
            Déconnexion
          </Link>
        )}
      </nav>
    </header>
  );
}
