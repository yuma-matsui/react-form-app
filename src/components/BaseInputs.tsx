import { FC } from "react"
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"

import { InputName } from "../types/inputName"
import { User } from "../types/user"
import { ErrorMessage } from "./ErrorMessage"
import { Input } from "./Input"

type Props = {
  register: UseFormRegister<User>
  errors: Partial<FieldErrorsImpl<User>>
  formItems: { name: InputName, label: string }[]
}

export const BaseInputs: FC<Props> = ({ register, errors, formItems }) => (
  <>
    {formItems.map(({ name, label }) => (
      <div key={label}>
        <Input
          register={register}
          name={name}
          label={label}
        />
        {errors[name] && <ErrorMessage />}
      </div>
    ))}
  </>
)
