import { useState } from "react";
import LoginForm from "./features/auth/LoginForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginForm onLoggedIn={() => setIsLoggedIn(true)} />;
  }

  return (
    <main className="p-8">
      <p>Logged in. Your contacts will appear here.</p>
    </main>
  );
}

export default App;
