import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { InputName } from "../types/inputName"
import { User } from "../types/user"
import { BaseInputs } from "./BaseInputs"

type FormItems = { name: InputName, label: string }[]

const firstFormItems: FormItems = [
  { name: 'nickname', label: 'ニックネーム' },
  { name: 'firstName', label: '名前' },
  { name: 'lastName', label: '名字' }
]
const secondFormItems: FormItems = [
  { name: 'email', label: 'メールアドレス' },
  { name: 'phoneNumber', label: '電話番号' }
]
const lastFormItems: FormItems = [
  { name: 'password', label: 'パスワード' },
  { name: 'passwordConfirmation', label: '確認用' },
]

const formItems: FormItems[] = [
  firstFormItems,
  secondFormItems,
  lastFormItems
]

const Form: FC = () => {
  const {
    handleSubmit,
    register,
    formState: {
      errors
    }} = useForm<User>()

  const onSubmit: SubmitHandler<User> = (data) => console.log(data)

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-48">
      {formItems.map((items, index) => (
        <BaseInputs
          key={items[0].name}
          register={register}
          errors={errors}
          formItems={items}
        />
      ))}
      <input type="submit" value="提出する" />
    </form>
  )
}

export default Form
