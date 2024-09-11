import { useContext } from "react";
import { UserContext } from "../hooks/UserContextProvider";
import homeImage from "../public/homeImage.webp";
import "../assets/styles/home.scss";

function Home() {
  const context = useContext(UserContext);
  console.log(context);
  return (
    <main className="main_home">
      <h1>Bienvenue sur Anime-Legend</h1>

      <p>
        Bienvenue sur Anime-Legend, votre destination ultime pour tout ce qui
        touche à l&apos;univers des animes ! Plongez dans un monde fascinant où
        la culture japonaise s&apos;entremêle avec des récits captivants, des
        personnages inoubliables et des émotions à couper le souffle. Que vous
        soyez un fan aguerri ou un nouveau venu, Anime-Legend vous propose une
        expérience unique avec des critiques, des recommandations, des
        actualités et bien plus encore. Rejoignez notre communauté passionnée et
        découvrez les légendes de l&apos;anime qui ont marqué des générations.
      </p>

      <p>Votre aventure commence ici !</p>

      <div className="home-image">
        <img src={homeImage} alt="Image avec des personnages de mangas" />
      </div>
    </main>
  );
}

export default Home;
