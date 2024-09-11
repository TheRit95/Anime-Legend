import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContextProvider";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function BurgerMenu({ setIsOpenBurger }) {
  const user = useContext(UserContext);

  const handleLogout = (event) => {
    event.preventDefault();
    setIsOpenBurger(false);

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/logout`, {
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
      .then(() => user.setUser({}));
  };

  return (
    <div className="BurgerMenu">
      <nav>
        <Link to="/" onClick={() => setIsOpenBurger(false)}>
          Accueil
        </Link>
        <Link to="/anime" onClick={() => setIsOpenBurger(false)}>
          Anime
        </Link>

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
          <Link to="" onClick={handleLogout}>
            Déconnexion
          </Link>
        )}
      </nav>
    </div>
  );
}
