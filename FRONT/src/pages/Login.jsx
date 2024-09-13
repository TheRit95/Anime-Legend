// Importation du composant FormLogin qui contient le formulaire de connexion
import FormLogin from "../component/login/FormLogin";

// Déclaration du composant Login
export default function Login() {
  return (
    <main>
      {/* Inclusion du composant FormLogin pour afficher le formulaire de connexion */}
      <FormLogin />
    </main>
  );
}
