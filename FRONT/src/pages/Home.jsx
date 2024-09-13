// Importation de l'image utilisée sur la page d'accueil
import homeImage from "../public/homeImage.webp";

// Importation des styles spécifiques pour la page d'accueil
import "../assets/styles/home.scss";

// Déclaration du composant Home
function Home() {
  return (
    <main className="main_home">
      {/* Titre de la page d'accueil */}
      <h1>Bienvenue sur Anime-Legend</h1>

      {/* Paragraphe d'introduction sur le site et l'univers des animes */}
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

      {/* Message invitant les utilisateurs à commencer leur exploration */}
      <p>Votre aventure commence ici !</p>

      {/* Section contenant l'image principale de la page d'accueil */}
      <div className="home-image">
        <img src={homeImage} alt="Image avec des personnages de mangas" />
      </div>
    </main>
  );
}

// Exportation du composant Home pour l'utiliser ailleurs dans l'application
export default Home;
