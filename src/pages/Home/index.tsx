import { useEffect, useState } from "react";
import { getDatabase, ref, set, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { returnErrorMsg } from "../../utils/ErrorReport";
import { useLoader } from "../../hooks/useLoader";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import UUID from "uuid-int";
import { useCommands } from "../../hooks/useCommands";
import { ChatCenteredDots } from "@phosphor-icons/react";

export default function Home(){
  const db = getDatabase();
  const generator = UUID(0);
  const navigate = useNavigate()

  const { user } = useAuth()
  const { setLoading } = useLoader()
  const [ command, setCommand ] = useState<number>()

  const { allCommands, getAllCommands, setAllCommands} = useCommands()

  useEffect(() => {
    getAllCommands()
  },[])

  async function handleSearchCommand(){
    if(!command){
      toast.error('Informe o número da comanda')
      return
    } 
    
    try {
      setLoading(true)

      if(allCommands.length > 0){   
        const updatedCommands = [...allCommands];     
        const commandExist = allCommands.findIndex(commandItem => commandItem.commandNumber === String(command))
        
        if(commandExist >= 0){
          navigate(`/commands/${commandExist}`)
          return
        } else {
          const newCommand = {
            commandNumber: String(command),
            commandId: String(generator.uuid()),
            openedBy: user.data.user.name,
            commandStatus: 'open'
          }
  
          updatedCommands.push(newCommand)
  
          update(ref(db, 'commands/'+ (updatedCommands.length - 1)), updatedCommands[updatedCommands.length - 1])
          .then(() => {
            navigate(`/commands/${updatedCommands.length - 1}`)
          }).catch((error) => {
            console.log('error2', error)
          })
        }
        
        setAllCommands(updatedCommands)
        
      } else {
        const newCommand = {
          commandNumber: String(command),
          commandId: String(generator.uuid()),
          openedBy: user.data.user.name,
          commandStatus: 'open'
        }

        set(ref(db, 'commands/'), [newCommand])
          .then(() => {
            navigate(`/commands/0`)
          }).catch((error) => {
            console.log('error2', error)
          })
      }


    } catch (error) {
      toast.error(returnErrorMsg(error, 'Algum erro aconteceu, tente novamente'))
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="h-full flex flex-col justify-center items-center w-full pt-20">

        <div className="flex items-center flex-col p-8 gap-4 bg-gray-100 rounded-xl m-4 max-w-[40rem] w-full">
          <ChatCenteredDots size={35} className="text-blue-600"/>
          <p className="text-black">Ativar ou adicionar item à comanda</p>
          <input
            id="comand"
            name="comand"
            type="number"
            placeholder="Número da comanda"
            onChange={(e) => setCommand(Number(e.target.value))}
            className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            onClick={handleSearchCommand}
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Continuar
          </button>
        </div>

      </div>
  );
}