import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import firebaseConfig from '../config/firebaseConfig'

const useFirebaseAuth = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const loginWithGoogle = async () => await signInWithPopup(auth, provider)

  return {
    loginWithGoogle
  }
}

export default useFirebaseAuth
