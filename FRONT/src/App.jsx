import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import Anime from "./pages/Anime";
import Footer from "./component/Footer";
import AnimeDetails from "./pages/AnimeDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<p>NOT FOUND</p>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
