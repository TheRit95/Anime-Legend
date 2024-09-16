import { Routes, Route } from "react-router-dom";
import banImage from "./public/banImage.webp";

import Header from "./component/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import AnimeDetails from "./pages/AnimeDetails";
import Admin from "./pages/Admin";
import Footer from "./component/Footer";

import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./hooks/UserContextProvider";

function App() {
  const user = useContext(UserContext);
  if (user.statut === 0) {
    return (
      <div>
        <h1>Vous êtes bannis !!</h1>
        <img src={banImage} className="Gorille" alt="Image de bannissement" />
      </div>
    );
  }
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
