import { ReactNode, createContext, useState } from 'react'

type LoaderContextType = {
    show: boolean
    setLoading: (isShow: boolean) => void
}

type loadContextProviderProps = {
    children: ReactNode
}

export const LoaderContext = createContext({} as LoaderContextType)

export function LoaderContextProvider({ children }: loadContextProviderProps) {
    const [show, setShow] = useState(false)

    const setLoading = (isShow: boolean) => {
        setShow(isShow)
    }

    return (
        <LoaderContext.Provider
            value={{
                setLoading,
                show
            }}
        >
            {children}
        </LoaderContext.Provider>
    )
}
