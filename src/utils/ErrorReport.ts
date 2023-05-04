export const returnErrorMsg = (error?: any, defaultMessage?: string) => {
    
    if(error.response){
        if(error.response.status === 401) {
            typeof window !== 'undefined' && localStorage.removeItem('token')
            typeof window !== 'undefined' && localStorage.removeItem('user')
            return defaultMessage
        }

        if(error.response.status === 404) {
            return 'Não encontrado'
        }

        if(error.response.data.message){
            return error.response.data.message
        }
        
        if(error.response.data.errors){
            const errors = error.response.data.errors
            const firstErroIndex = Object.keys(errors)[0]
            
            const errorMsg = errors[firstErroIndex][0]

            return errorMsg
        }

        return defaultMessage
    } else {
        return defaultMessage
    }
}
