import useFirebaseAuth from "./hooks/useFirebaseAuth"

function App() {
  const { user, signIn, loading, signOut, deleteUser } = useFirebaseAuth()

  const onSignOut = async () => {
    await signOut()
  }
  const onDeleteAccount = async () => {
    await deleteUser()
  }

  return (
    loading
      ? <p>...Loading</p>
      : (
        user
          ? (
            <>
              <button onClick={onSignOut}>ログアウト</button>
              <button onClick={onDeleteAccount}>アカウント削除</button>
            </>
          )
          : (
            <div className="App">
              <button type="button" onClick={signIn}>Googleログイン</button>
            </div>
          )
      )
  )
}

export default App
