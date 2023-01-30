import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

import { InputName } from "../types/inputName"
import { User } from "../types/user"

type Props = {
  register: UseFormRegister<User>
  label: string
  name: InputName
}

const isPassword = (type: string) => ((type === 'password') || (type === 'passwordConfirmation')) ? 'password' : 'text'

export const Input: FC<Props> = ({ register, label, name }) => (
  <>
    <label htmlFor={name}>
      {label}
      <input
        type={isPassword(name)}
        id={name}
        { ...register(name, { required: true }) }
        autoComplete="off"
      />
    </label>
  </>
)
