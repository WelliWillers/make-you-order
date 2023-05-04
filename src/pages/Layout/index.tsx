import { Outlet } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";
import { useLoader } from "../../hooks/useLoader";

export default function Layout() {
  const { show } = useLoader()
  return (
    <div className="min-h-screen h-full w-full bg-gray-800 text-white p-8">
       {
        show && (
          <div className="h-screen w-screen bg-gray-800 text-white p-2 fixed left-0 top-0 bottom-0 right-0 opacity-60 z-[1000] flex items-center justify-center">
            <CircleNotch className="animate-spin" size={50} />
          </div>
        )
      }
      <div className="container mx-auto mb-24">
        <Outlet />
      </div>
    </div>
  );
}
