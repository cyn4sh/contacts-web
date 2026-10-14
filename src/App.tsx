import { useEffect, useState } from "react";
import { refreshAccessToken } from "./api/client";
import LoginForm from "./features/auth/LoginForm";
import ContactList from './features/contacts/ContactList';

type Session = "checking" | "signedIn" | "signedOut";

function App() {
  const [session, setSession] = useState<Session>("checking");

  useEffect(() => {
    refreshAccessToken()
      .then((token) => setSession(token ? "signedIn" : "signedOut"))
      .catch(() => setSession("signedOut"));
  }, []);

  if (session === "checking") {
    return <p>Loading...</p>;
  }

  if (session === "signedOut") {
    return <LoginForm onLoggedIn={() => setSession("signedIn")} />;
  }

  return (
    <main className="p-8">
      <ContactList />
    </main>
  );
}

export default App;
