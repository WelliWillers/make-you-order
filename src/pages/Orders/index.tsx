import { getDatabase, ref, update } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useLoader } from "../../hooks/useLoader";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { returnErrorMsg } from "../../utils/ErrorReport";
import { useCommands } from "../../hooks/useCommands";

export default function Orders() {
  const { user } = useAuth();
  const { setLoading } = useLoader();
  const db = getDatabase();
  const { allCommands, getAllCommands } = useCommands()

  useEffect(() => {
    getAllCommands();
  }, []);

  function handleCheckThisOrderFinish(
    commandNumber: string,
    orderNumber: number
  ) {

    const commandExist = allCommands.findIndex(commandItem => commandItem.commandNumber === String(commandNumber))
    
    if(commandExist! >= 0){
      setLoading(true);        
      update(ref(db, `commands/${commandExist}/ordersList/${orderNumber}`), {
        orderStatus: "pronto",
      })
        .then(() => {
          toast.success("Pedido concluido com sucesso");
        })
        .catch((error) => {
          returnErrorMsg(error, "Algum erro aconteceu, tente novamente");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <div className="text-center">
      <p className="pb-4 text-2xl">Todos pedidos</p>

      <ul className="flex gap-4 flex-col">
        {allCommands.length > 0 ? (
          allCommands.map((command) => {
            const sortedByDate = command.ordersList && command.ordersList.sort((a, b) => Number(b.orderDate) - Number(a.orderDate))
            
            return sortedByDate && command.commandStatus === 'open' &&
            sortedByDate!.map((order, index) =>
              order.orderStatus === "realizado" ? (

                <>
                  {
                    user.data.user.permission != "user" && (

                      <li
                        key={order.orderId}
                        className="flex flex-col justify-between w-full items-center p-4 rounded-lg bg-gray-700 hover:bg-gray-900 transition-colors"
                      >
                        <div
                          className="flex flex-row gap-4 outline-0 items-center justify-between w-full"
                          data-testid="task"
                        >
                          {user.data.user.permission === "copa" || "admin" && (
                            <label className="relative">
                              <input
                                type="checkbox"
                                className="h-6 w-6 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600 before:data-[type=checkbox]:rounded-2xl"
                                readOnly
                                checked={false}
                                onClick={() =>
                                  handleCheckThisOrderFinish(
                                    command.commandNumber!,
                                    index
                                  )
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          )}
                          
                          <div>
                            <p>COMANDA: {command.commandNumber}</p>
                          </div>
                          <p>
                            LOCAL:{" "}
                            {command.local!.type}{" "}
                            {command.local!.type === "mesa" && command.local!.table}
                          </p>
                          <p>
                            {format(
                              Number(order.orderDate),
                              "dd/MM/yyyy - HH:mm"
                            )}
                          </p>
                        </div>
                        <div className="w-full my-4 grid grid-cols-1 md:grid-cols-2 gap-2 flex-col">
                          {
                          order.orderListItems ? 
                          order.orderListItems.map((item) => (
                            <div key={item.id} className="w-full p-4 rounded-lg bg-gray-600 flex justify-between items-center">
                              <span className="text-blue-600 bg-gray-100 px-3 py-1 rounded-lg">{item.qtd}x</span>
                              <p className="text-white">
                                {item.name}
                              </p>
                            </div>
                          )) : (
                            <p>Os items deste pedido foram deletados mas o pedido não, peça para o garçon deletá-lo.</p>
                          )}
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center w-full">
                          <p className="text-white font-bold">{order.orderDescription ? order.orderDescription : 'Não foi especificada uma descrição' }</p>
                          <p className="text-sm text-gray-400">RESPONSÁVEL: {order.orderOpenedBy}</p>
                        </div>
                      </li>
                    )
                  }
                </>
              ) : (
                <>
                {
                  user.data.user.permission === "user" && (
                    <li
                      key={order.orderId}
                      className={`flex justify-between w-full items-center p-4 rounded-lg bg-green-600`}
                    >
                      <div
                        className="flex flex-col md:flex-row gap-4 outline-0 items-center justify-between w-full"
                        data-testid="task"
                      >
                        <div className="flex justify-between items-center gap-4 w-full">
                          <p>RESPONSÁVEL: {order.orderOpenedBy}</p>
                          <p>COMANDA: {command.commandNumber}</p>
                        </div>

                        <div className="flex justify-between items-center gap-4 w-full">
                          <p>
                            {format(
                              Number(order.orderDate),
                              "dd/MM/yyyy - HH:mm"
                            )}
                          </p>
                          <p className="capitalize">
                            {command.local!.type}{" "}
                            {command.local!.type === "mesa" && " - " +command.local!.table}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                }
                </>
              )
            )

          })
        ) : (
          <p>Nenhum pedido ainda cadastrado</p>
        )}
      </ul>
    </div>
  );
}
