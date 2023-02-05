import useFirebaseAuth from "./hooks/useFirebaseAuth"

function App() {
  const { signInWithGoogle, user, signOut, deleteAccount } = useFirebaseAuth()

  const onClick = async () => await signInWithGoogle()
  const onClickSignOut = async () => await signOut()
  const onClickDeleteAccount = async () => await deleteAccount()

  return (
    <div className="App">
      <button type="button" onClick={onClick}>Googleログイン</button>
      {user?.uid}
      {user &&
        <>
          <button type="button" onClick={onClickSignOut}>ログアウト</button>
          <button type="button" onClick={onClickDeleteAccount}>アカウントの削除</button>
        </>
      }
    </div>
  );
}

export default App
