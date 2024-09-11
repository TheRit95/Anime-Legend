import { useState } from "react";

export default function FormRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [erreurMessage, setErreurMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/register`, {
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
      .then((data) => console.log(data))
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
        <label htmlFor="username">Votre pseudo</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Choisissez votre pseudo"
          onChange={handleInputChange}
          value={formData.username}
        />

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

        <input type="submit" value="S'inscrire" />
      </form>

      <p>{erreurMessage}</p>
    </>
  );
}
