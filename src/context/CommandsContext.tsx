import { ReactNode, createContext, useState } from 'react'
import { useLoader } from '../hooks/useLoader'
import { CommandsProps } from '../types'
import { getDatabase, onValue, ref } from 'firebase/database'

type CommandsContextType = {
    allCommands: CommandsProps[] 
    getAllCommands(): Promise<void>
    setAllCommands: React.Dispatch<React.SetStateAction<CommandsProps[]>>
}

type commandContextProviderProps = {
    children: ReactNode
}

export const CommandsContext = createContext({} as CommandsContextType)

export function CommandsContextProvider({ children }: commandContextProviderProps) {
    const { setLoading } = useLoader()
    const [allCommands, setAllCommands] = useState<CommandsProps[]>([])

    const db = getDatabase();
    
    async function getAllCommands(){
        setLoading(true)

        const starCountRef = await ref(db, 'commands')

        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if(data){
                setAllCommands(data)
            }
            setLoading(false)
        })
    }

    return (
        <CommandsContext.Provider
            value={{
                getAllCommands,
                allCommands,
                setAllCommands
            }}
        >
            {children}
        </CommandsContext.Provider>
    )
}
