import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login automatico: App.tsx gestisce il cambio pagina
    } catch (err: any) {
      setError("Credenziali non valide.");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Accedi a OSR</h2>

      <form onSubmit={handleLogin}>
        <label>Email</label><br />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <br /><br />

        <label>Password</label><br />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit" style={{ marginTop: 20 }}>
          Login
        </button>

        {error && (
          <p style={{ color: "red", marginTop: 10 }}>{error}</p>
        )}
      </form>
    </div>
  );
}
