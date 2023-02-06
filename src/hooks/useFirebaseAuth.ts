import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, User, browserLocalPersistence } from 'firebase/auth'
import { useEffect, useState } from 'react'

import firebaseConfig from '../config/firebaseConfig'

const useFirebaseAuth = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const [user, setUser] = useState<User | null>(null)
  const signInWithGoogle = async () => {
    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        const user = (await signInWithPopup(auth, provider)).user
        setUser(user)
      })
  }

  const signOut = async () => await auth.signOut()

  const deleteAccount = async () => {
    if (user) await user.delete()
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      let _user: User | null = null
      if (user) _user = user
      setUser(_user)
    })
  })

  return {
    signInWithGoogle,
    signOut,
    user,
    deleteAccount
  }
}

export default useFirebaseAuth
