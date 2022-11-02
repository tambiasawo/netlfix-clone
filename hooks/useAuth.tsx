import React from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}
interface AuthProviderProps {
  children: React.ReactNode
}
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = React.useState<User | null>()
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)

  //to make the user persist on page refresh
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(true)
        router.push('/login')
      }
      setInitialLoading(false)
    })
  }, [auth])
  const signUp = async (email: string, password: string) => {
    setLoading(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => {
        alert(error.message)
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const logout = async () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        setUser(null)
        setLoading(false)
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => setLoading(false))
  }

  //onnly rerun this function if onr of the dependencies has changed
  const value = useMemo(() => {
    return {
      loading: false,
      user: null,
      signUp,
      signIn,
      logout,
      error,
    }
  }, [user, loading, error])
  return (
    <AuthContext.Provider value={value}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
