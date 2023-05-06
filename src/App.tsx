import useFirebaseAuth from "./hooks/useFirebaseAuth"

function App() {
  const {
    currentUser,
    loading,
    signOut,
    deleteUser,
    error,
    register,
    handleSubmit,
    onSubmit,
    disabled,
    errors,
    success
  } = useFirebaseAuth()

  if (success) return <p>メールを送信しました</p>
  if (loading) return <p>...Loading</p>
  // if (error?.code === 'auth/invalid-email') return <pre>{error.code}</pre>
  // if (error) return <p>{error.message}</p>

  return (
    currentUser
      ? (
          <>
            <button onClick={signOut}>ログアウト</button>
            <button onClick={deleteUser}>アカウント削除</button>
          </>
      ) : (
        <div className="App">
          {error && <span style={{ color: 'red' }}>{error.message}</span>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>パスワードを忘れた方</h2>
            <div>
              <label htmlFor="email">
                メールアドレス
                <input type="text" { ...register('user.email', { required: true })} />
              </label>
              {errors?.email && <span>メールアドレスを入力してください</span>}
            </div>
            <div>
              <label htmlFor="password">
                パスワード
                <input type="password" {...register('user.password', { required: true })} />
              </label>
              {errors?.password && <span>パスワードを入力してください</span>}
            </div>
            <input type="submit" value='登録' disabled={disabled} />
          </form>
        </div>
      )
  )
}

export default App
