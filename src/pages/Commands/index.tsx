import { getDatabase, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreditCard, Export, X } from "@phosphor-icons/react";
import { useLoader } from "../../hooks/useLoader";
import CommandList from "./commandsList";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { returnErrorMsg } from "../../utils/ErrorReport";
import { useCommands } from "../../hooks/useCommands";
import { validUserPermission } from "../../utils/ValidUserPermission";
import { useNavigate } from "react-router-dom";
import { CommandsProps } from "../../types";

export default function Commands() {

  const {setLoading} = useLoader()
  const {user} = useAuth()
  const db = getDatabase();
  const navigate = useNavigate();
  const { allCommands, getAllCommands } = useCommands()

  const [commandToSearch, setCommandToSearch] = useState<number>()
  
  const haveCommandsOpen = allCommands.find(command => command.commandStatus === "open")

  const filteredCommands = commandToSearch ? allCommands.filter(command => command.commandNumber?.includes(String(commandToSearch))) : allCommands

  function handleFinishCommand(command: CommandsProps){

    if(user.data.user.permission != 'admin'){
      toast.error('Você não tem permissão para finalizar comandas')
      return
    } 

    const commandExist = allCommands.findIndex(commandItem => commandItem.commandNumber === String(command.commandNumber))

    if(commandExist! >= 0){
      setLoading(true)
  
      const data = {
        commandStatus: 'close'
      }
  
      update(ref(db, 'commands/' + commandExist), data).then(() => {
        toast.success('Comanda alterada com sucesso')
      }).catch((error) => {      
        returnErrorMsg(error, 'Algum erro aconteceu, tente novamente')
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    getAllCommands()
  }, [])

  if(!validUserPermission('admin', user.data.user.permission)){
    navigate('/home')
  }

  function handleFinishNight(){
    
  }

  return (
    <div className="w-full text-center">
      <p className="text-3xl pb-8">Lista de comandas</p>

      <div className="pb-4 ">
        <input
          id="comand"
          name="comand"
          type="number"
          value={commandToSearch}
          placeholder="Digite o número da comanda aqui"
          onChange={(e) => setCommandToSearch(Number(e.target.value))}
          className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />

      </div>

      {
        filteredCommands.length ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {
              filteredCommands.map((item) => {
                return (
                  <Dialog.Root key={item.commandId}>
                    <Dialog.Trigger asChild>
                      <div className="w-full" key={item.commandId}>
                        <button className={`w-full rounded-lg p-4 ${item.commandStatus === 'close' ? 'bg-gray-500 text-gray-900' : 'bg-gray-100 text-gray-900' }`}>
                          <div className="pb-2 flex gap-4 items-center justify-center">
                            <p className="">Comanda: </p>
                            <p className="w-auto h-8 px-4 rounded-lg bg-blue-900 flex items-center justify-center text-gray-100">{item.commandNumber}</p>
                          </div>
                          <p className="capitalize">Tipo de comanda: {item.commandtypeName}</p>
                          <p className="text-xs  py-2">Aberto por: {item.openedBy}</p>
                          <p className={`${item.commandStatus === 'open' ? 'bg-blue-900' : 'bg-gray-700'} text-white p-2 rounded-xl capitalize`}>{item.commandStatus === 'open' ? 'Aberta' : 'Fechada' }</p>
                        </button>
                      </div>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                      <Dialog.Overlay className="bg-black opacity-50 fixed inset-0" />
      
                      <Dialog.Content className="animate-fadeIn overflow-scroll bg-gray-50 p-4 mr-2 w-full rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[95%] max-h-[90%]">
                        
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-xl pb-4 font-bold">Resumo do pedido: {item.commandNumber} </Dialog.Title>
                          <Dialog.Close asChild>
                            <button aria-label="Fechar">
                              <X size={20} />
                            </button>
                          </Dialog.Close>
                        </div>
                      
                        <CommandList commandTypeAmount={item.commandtype!} consumation={item.commandtypeConsumation!} orders={item.ordersList ? item.ordersList : []}/>
                      
                        <Dialog.Close asChild className="sticky bottom-0 left-0 right-0 w-full px-4 p-6 mt-4 shadow-gray-400 shadow-md rounded-lg bg-gray-200">
                          <div className="flex flex-col md:flex-row gap-4">
                            <button
                              className="flex w-full justify-center rounded-md bg-gray-400 px-3 py-4 text-sm font-semibold leading-6 text-blue-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                              Cancelar
                            </button>
                            {
                              item.commandStatus === 'open' &&
                              user.data.user.permission === 'admin' && (
                                <button
                                  onClick={() => handleFinishCommand(item)}
                                  className="flex items-center w-full justify-center rounded-md bg-green-600 px-3 py-4 text-sm font-semibold leading-6 text-blue-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                <CreditCard className="mr-2" size={25} /> Finalizar comanda
                                </button>
                              )
                            }
                          </div>
                        </Dialog.Close>
      
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                  
                )
              })
            }
          </div>
        ) : (
          <p>Nenhuma comanda em uso no momento</p>
        )
      }

      {
        !haveCommandsOpen && (
          <button
            onClick={handleFinishNight}
            className="flex items-center mt-8 w-full justify-center rounded-md bg-blue-600 px-3 py-4 text-sm font-semibold leading-6 text-blue-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Export className="mr-2" size={25} /> Finalizar noite
          </button>
        )
      }
    </div>
  );
 
}