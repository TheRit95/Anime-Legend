import FooterIcon from "./FooterIcon"; // Importation du composant FooterIcon
import "../assets/styles/footer.scss"; // Importation des styles pour le footer

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <h2>Anime-Legend</h2> {/* Titre du footer */}
        <FooterIcon /> {/* Composant pour les icônes de réseaux sociaux */}
        <p>
          Connectez-vous pour plus d&apos;informations et de services
          personnalisés.
        </p>{" "}
        {/* Message d'information */}
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Anime-Legend. Tous droits réservés.
        {/* Copyright et année actuelle */}
      </div>
    </footer>
  );
}
