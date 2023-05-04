import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function IsNotLoged() {
  const { user } = useAuth();

  if (!user.data) {
    toast.error('Você precisa estar logado')
    return <Navigate to="/" />;
  }

  return (
    <div className="h-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}