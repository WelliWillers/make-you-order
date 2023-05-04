import { createContext, ReactNode, useState } from "react";
import { signInWithEmailAndPassword, User } from "firebase/auth";

import { getDatabase, ref, onValue} from "firebase/database";
import { auth } from "../services/firebase";
import { toast } from "react-toastify";
import { useLoader } from "../hooks/useLoader";
import { returnErrorMsg } from "../utils/ErrorReport";


type UserInfos = {
  user: User,
  data: {
    user: {
      name: string,
      permission: 'admin' | 'copa' | 'user'
    }
  }
}

type AuthContextType = {
  user: UserInfos
  signIn: (email: string, password:string) => Promise<void>
  logout: () => void
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  let { setLoading } = useLoader()

  const [user, setUser] = useState<UserInfos>(():UserInfos => {
    const userExist = localStorage.getItem('user')
    if(userExist){
      return JSON.parse(userExist)
    } else {
      return {} as UserInfos
    }
  });
  const db = getDatabase();

  const logout = () => {
    localStorage.removeItem('user')
    setUser({} as UserInfos)
    toast.success('Você saiu')
  }

  async function signIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userFound = ref(db, 'users/' + user.uid);
        
        onValue(userFound, (userInfos) => {
          const data = userInfos.val();
          const newUserData = {
            user,
            data
          }
          
          toast.success('Login realizado com sucesso')
          localStorage.setItem('user', JSON.stringify(newUserData))
          setUser(newUserData)
        })
      })
      .catch((e) => {
        toast.error(returnErrorMsg(e,'E-mail e/ou senha inválidos'))
      }).finally(() => {
        setLoading(false)
      })
  }
  
  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}