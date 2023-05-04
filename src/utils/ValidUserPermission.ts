import { toast } from "react-toastify"

export function validUserPermission(permission: string, userPermission:string): boolean {
  if(userPermission != permission){
    toast.error('Você não possui as permições necessárias para acessar esta página')
    return false
  }
  
  return true
}