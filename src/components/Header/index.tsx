import { ArrowLeft, Power } from "@phosphor-icons/react";
import { useAuth } from "../../hooks/useAuth";
import { useMatch, useNavigate } from "react-router-dom";

export default function Header() {
  const { logout, user } = useAuth()

  const match = useMatch('/home')
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center pb-8">
      <div className="flex items-center gap-6">
        {
          !match && (
            <ArrowLeft className="hover:scale-105 cursor-pointer" size={25} onClick={() => navigate(-1)} />
          ) 
        }
        <p className="h-10 w-10 rounded-full ring-2 ring-blue-300 bg-blue-500 text-white flex justify-center items-center">{user.data.user.name.substring(0,1)}</p>
        <p>{user.data.user.name}</p>
      </div>
      <button type="submit" onClick={logout} className="flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <Power size={25} />
      </button>
    </div>
  );
}
