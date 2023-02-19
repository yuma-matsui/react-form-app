import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, User, browserLocalPersistence } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAuthState, useDeleteUser, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth'

import firebaseConfig from '../config/firebaseConfig'

const useFirebaseAuth = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const [user, setUser] = useState<User | undefined | null>(undefined)

  const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth)
  const [authUser, authLoading, authError ] = useAuthState(auth)
  const [signOut, signOutLoading, signOutError] = useSignOut(auth)
  const [deleteUser, deleteLoading, deleteError] = useDeleteUser(auth)

  const signIn = async () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithGoogle()
      })
  }

  useEffect(() => {
    setUser(authUser)
  }, [authUser])


  return {
    signIn,
    signOut,
    deleteUser,
    user,
    loading: authLoading || loading || signOutLoading || deleteLoading,
    error: error || authError || signOutError || deleteError
  }
}

export default useFirebaseAuth
