import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export interface AuthData {
  isAuth: boolean
}

export const initialAuthData: AuthData = {
  isAuth: false,
}

export interface AuthContextType {
  authData: AuthData
  setAuthData: Dispatch<SetStateAction<AuthData>>
}

export const AuthContext = createContext<AuthContextType>(
  null as unknown as AuthContextType
)
export const useAuthContext = () => useContext(AuthContext)
