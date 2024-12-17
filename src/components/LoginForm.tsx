import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "../utils/api";

interface ILoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: ILoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Login</Typography>
        {error && <Typography sx={{ marginBottom: 2 }} color="error">{error}</Typography>}
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </div>
  );
}
