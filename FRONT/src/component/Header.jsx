import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContextProvider";
import BurgerIcon from "./BurgerIcon";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const user = useContext(UserContext);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

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
        if (!response.ok) throw "error";
        return response.json();
      })
      .then(() => user.setUser({}));
  };

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
