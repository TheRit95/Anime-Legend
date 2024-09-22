import { useContext, useState } from "react";
import { UserContext } from "../hooks/UserContextProvider";
import homeImage from "/img/admin.webp";
import CommentAdmin from "../component/Admin/CommentAdmin";
import TableAnimeAdmin from "../component/Admin/TableAnimeAdmin";

export default function Admin() {
  const [tabName, setTabName] = useState("comments");
  const users = useContext(UserContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!users?.email || users?.isAdmin === 0) {
    window.location.href = "/";
  } else {
    return (
      <main className="admin-panel">
        <h1>Panneau d&apos;administration</h1>

        <img
          src={homeImage}
          alt="Image animée d'une personne qui écrit au clavier"
          loading="lazy"
        />

        <nav>
          <button onClick={() => setTabName("comments")}>Commentaires</button>
          <button onClick={() => setTabName("animes")}>Animes</button>
        </nav>

        {tabName === "comments" && <CommentAdmin />}
        {tabName === "animes" && <TableAnimeAdmin />}

        <button className="scroll-top" onClick={scrollToTop}>
          ↑
        </button>
      </main>
    );
  }
}
