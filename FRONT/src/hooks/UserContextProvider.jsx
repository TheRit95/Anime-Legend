import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  username: "",
  email: "",
  statut: 1,
  isAdmin: 0,
  setUser: () => null,
});
// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "error";
        return response.json();
      })
      .then((data) => setUser(data.user));
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
