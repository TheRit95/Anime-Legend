import FooterIcon from "./FooterIcon";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <h2>Anime-Legend</h2>
        <FooterIcon />
        <p>
          Connectez-vous pour plus d&apos;informations et de services
          personnalisés.
        </p>{" "}
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Anime-Legend. Tous droits réservés.
      </div>
    </footer>
  );
}
