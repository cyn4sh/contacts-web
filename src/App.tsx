import { useEffect, useState } from "react";
import { refreshAccessToken, $api } from "./api/client";
import LoginForm from "./features/auth/LoginForm";
import ContactList from './features/contacts/ContactList';
import ContactForm from "./features/contacts/ContactForm"
import { useQueryClient } from "@tanstack/react-query";
import { setAccessToken } from "./lib/auth/token";

type Session = "checking" | "signedIn" | "signedOut";

function App() {
  const [session, setSession] = useState<Session>("checking");
  const queryClient = useQueryClient();
  const logout = $api.useMutation("post", "/api/auth/logout/");

  useEffect(() => {
    refreshAccessToken()
      .then((token) => setSession(token ? "signedIn" : "signedOut"))
      .catch(() => setSession("signedOut"));
  }, []);

  function handleLogout() {
    logout.mutate(
      {},
      {
        onSettled: () => {
          setAccessToken(null);
          queryClient.clear();
          setSession("signedOut");
        }
      }
    )
  }

  if (session === "checking") {
    return <p>Loading...</p>;
  }

  if (session === "signedOut") {
    return <LoginForm onLoggedIn={() => setSession("signedIn")} />;
  }

  return (
    <main className="p-8">
      <button type="button" onClick={() => handleLogout()}>
        Logout
      </button>
      <ContactForm />
      <ContactList />
    </main>
  );
}

export default App;
