import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContextProvider";

export default function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const context = useContext(UserContext);

  const [erreurMessage, setErreurMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw "error";
        return response.json();
      })
      .then((data) => context.setUser(data.user))
      .catch((err) => setErreurMessage(err));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form_auth">
        <label htmlFor="email">Adresse email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Votre email"
          onChange={handleInputChange}
          value={formData.email}
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Votre mot de passe"
          onChange={handleInputChange}
          value={formData.password}
        />

        <input type="submit" value="Se connecter" />
      </form>

      <p>{erreurMessage}</p>
    </>
  );
}
