import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useAuthState, useCreateUserWithEmailAndPassword, useDeleteUser, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignOut } from 'react-firebase-hooks/auth'

import firebaseConfig from '../config/firebaseConfig'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'

type UserCredential = {
  user: {
    email: string
    password: string
  }
}

const initialUser = {
  email: '',
  password: '',
}

const url = {
  url: 'http://localhost:3000'
}

const useFirebaseAuth = () => {
  initializeApp(firebaseConfig)
  const auth = getAuth()

  const [currentUser, authChangeLoading, authChangeError ] = useAuthState(auth)
  const [signInWithEmailAndPassword, , signInLoading, signInError] = useSignInWithEmailAndPassword(auth)
  const [createUserWithEmailAndPassword, , createUserLoading, createUserError] = useCreateUserWithEmailAndPassword(auth)
  const [signOut, signOutLoading, signOutError] = useSignOut(auth)
  const [deleteUser, deleteLoading, deleteError] = useDeleteUser(auth)

  const [success, setSuccess] = useState(false)
  const [sendPasswordResetEmail, sending, sendingError] = useSendPasswordResetEmail(auth)


  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      isSubmitting,
      isValid,
      errors: {
        user: errors
      }
  }} = useForm<UserCredential>({
    mode: 'onChange'
  })

  const disabled = !isValid || isSubmitting
  const onSubmit: SubmitHandler<UserCredential> = async ({ user: { email, password } }) => {
    const success = await sendPasswordResetEmail(email, url)
    setSuccess(success)
    setValue('user', initialUser)
  }


  return {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    deleteUser,
    currentUser,
    loading: signInLoading || authChangeLoading || signOutLoading || deleteLoading || createUserLoading || sending,
    error: signInError || createUserError || sendingError,
    register,
    handleSubmit,
    onSubmit,
    disabled,
    errors,
    sendPasswordResetEmail,
    success
  }
}

export default useFirebaseAuth
