import { useEffect } from "react";
import { useRouter } from "next/router";
import CarForm from "../components/CarForm";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return <CarForm />;
}
