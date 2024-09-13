// Importation des composants Routes et Route depuis react-router-dom pour gérer la navigation entre les pages
import { Routes, Route } from "react-router-dom";

// import PrivateRoute from "./components/PrivateRoute";

// Importation des différents composants et pages utilisés dans l'application
import Header from "./component/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import AnimeDetails from "./pages/AnimeDetails";
import Admin from "./pages/Admin";
import Footer from "./component/Footer";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />

      <Header />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="*" element={<p>NOT FOUND</p>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
