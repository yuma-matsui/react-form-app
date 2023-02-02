import { UserCredential } from "firebase/auth"
import { useState } from "react"

import Form from "./components/Form"
import useFirebaseAuth from "./hooks/useFirebaseAuth"

function App() {
  const [userCredential, setUserCredential] = useState<UserCredential>()

  const { loginWithGoogle } = useFirebaseAuth()
  const onClick = async () =>  {
    const userCredential = await loginWithGoogle()
    setUserCredential(userCredential)
  }

  console.log(userCredential)

  return (
    <div className="App">
      <button type="button" onClick={onClick}>Googleログイン</button>
      <Form />
    </div>
  );
}

export default App
