import { ClipboardText, House, ListChecks, SquaresFour } from "@phosphor-icons/react";
import { useAuth } from "../../hooks/useAuth";

export default function Footer() {
  const { user } = useAuth()

  return (
    <>
      {
        user.data && (
          <div className="fixed left-0 -bottom-3 min-h-[4rem] bg-gray-700 p-2 w-full flex items-center justify-center gap-2 rounded-t-3xl shadow-lg">
            {
              user.data.user.permission === 'admin' && (
                <>
                  <a href="/orders" className="rounded-3xl p-2">
                    <div className="-mt-14 text-blue-50 hover:shadow-2xl shadow-gray-700 bg-gray-900 hover:bg-blue-500 w-28 flex flex-col justify-center items-center p-4 rounded-2xl hover:text-white hover:scale-105 transition-all">
                      <ListChecks className="" weight="fill" size={30} />
                      <p className=" text-xs font-medium pt-1">Pedidos</p>
                    </div>
                  </a>
                  <a href="/home" className="rounded-3xl p-2">
                    <div className="-mt-14 text-blue-50 hover:shadow-2xl shadow-gray-700 bg-gray-900 hover:bg-blue-500 w-28 flex flex-col justify-center items-center p-4 rounded-2xl hover:text-white hover:scale-105 transition-all">
                      <House className="" weight="fill" size={30} />
                      <p className=" text-xs font-medium pt-1">Início</p>
                    </div>
                  </a>
                  <a href="/commands" className="rounded-3xl p-2">
                    <div className="-mt-14 text-blue-50 hover:shadow-2xl shadow-gray-700 bg-gray-900 hover:bg-blue-500 w-28 flex flex-col justify-center items-center p-4 rounded-2xl hover:text-white hover:scale-105 transition-all">
                      <ClipboardText className="" weight="fill" size={30} />
                      <p className=" text-xs font-medium pt-1">Comandas</p>
                    </div>
                  </a>
                </>
              )
            }
            {
              user.data.user.permission === 'copa' && (
                <>
                  <a href="/orders" className="rounded-3xl p-2">
                    <div className="-mt-14 text-blue-50 hover:shadow-2xl shadow-gray-700 bg-gray-900 hover:bg-blue-500 w-28 flex flex-col justify-center items-center p-4 rounded-2xl hover:text-white hover:scale-105 transition-all">
                      <ListChecks className="" weight="fill" size={30} />
                      <p className=" text-xs font-medium pt-1">Pedidos</p>
                    </div>
                  </a>
                  <a href="/products" className="rounded-3xl p-2">
                    <div className="-mt-14 text-blue-50 hover:shadow-2xl shadow-gray-700 bg-gray-900 hover:bg-blue-500 w-28 flex flex-col justify-center items-center p-4 rounded-2xl hover:text-white hover:scale-105 transition-all">
                      <SquaresFour className="" weight="fill" size={30} />
                      <p className=" text-xs font-medium pt-1">Produtos</p>
                    </div>
                  </a>
                </>
              )
            }
            {
              user.data.user.permission === 'user' && (
                <>
                  <a href="/orders" className="rounded-3xl p-2">
                    <div className="-mt-14 text-blue-50 hover:shadow-2xl shadow-gray-700 bg-gray-900 hover:bg-blue-500 w-28 flex flex-col justify-center items-center p-4 rounded-2xl hover:text-white hover:scale-105 transition-all">
                      <ListChecks className="" weight="fill" size={30} />
                      <p className=" text-xs font-medium pt-1">Pedidos</p>
                    </div>
                  </a>
                  <a href="/home" className="rounded-3xl p-2">
                    <div className="-mt-14 text-blue-50 hover:shadow-2xl shadow-gray-700 bg-gray-900 hover:bg-blue-500 w-28 flex flex-col justify-center items-center p-4 rounded-2xl hover:text-white hover:scale-105 transition-all">
                      <House className="" weight="fill" size={30} />
                      <p className=" text-xs font-medium pt-1">Início</p>
                    </div>
                  </a>
                  <a href="/products" className="rounded-3xl p-2">
                    <div className="-mt-14 text-blue-50 hover:shadow-2xl shadow-gray-700 bg-gray-900 hover:bg-blue-500 w-28 flex flex-col justify-center items-center p-4 rounded-2xl hover:text-white hover:scale-105 transition-all">
                      <SquaresFour className="" weight="fill" size={30} />
                      <p className=" text-xs font-medium pt-1">Produtos</p>
                    </div>
                  </a>
                </>
              )
            }
          </div>
        ) 
      }
    </>
  );
}