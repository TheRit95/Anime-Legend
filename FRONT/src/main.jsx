// Importation de StrictMode depuis React pour activer des vérifications supplémentaires en mode développement
import { StrictMode } from "react";
// Importation de createRoot depuis React pour rendre l'application dans le DOM
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./assets/styles/index.scss";

// Importation du provider UserContextProvider pour la gestion du contexte utilisateur dans l'application
import UserContextProvider from "./hooks/UserContextProvider.jsx";

// Rendu de l'application dans l'élément avec l'ID "root" dans le DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter englobe l'application pour activer la gestion des routes */}
    <BrowserRouter>
      {/* UserContextProvider englobe l'application pour fournir le contexte utilisateur */}
      <UserContextProvider>
        {/* App est le composant principal de l'application */}
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
