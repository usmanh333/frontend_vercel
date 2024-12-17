import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  // Redirect user if a token is found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLoginSuccess = () => {
    router.push("/dashboard");
  };

  return <LoginForm onSuccess={handleLoginSuccess} />;
}
