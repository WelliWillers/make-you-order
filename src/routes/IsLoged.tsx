import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function IsLoged() {
  const { user } = useAuth();
  
  if(user.data) {
    toast.warning('Você já esta logado')
    return <Navigate to={'/home'}/>
  }

  return <Outlet />
}