import { useState, type SubmitEvent } from "react";
import { $api } from "../../api/client";
import { setAccessToken } from "../../lib/auth/token";

interface LoginFormProps {
  onLoggedIn: () => void;
}

export default function LoginForm({ onLoggedIn }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = $api.useMutation("post", "/api/auth/login/", {
    onSuccess: (data) => {
      setAccessToken(data.access);
      onLoggedIn();
    },
  });

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    login.mutate({ body: { username, password } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <label>
        Username
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
      </label>
      {login.isError && (
        <p role="alert">Login failed. Check your username and password.</p>
      )}
      <button type="submit" disabled={login.isPending}>
        {login.isPending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
