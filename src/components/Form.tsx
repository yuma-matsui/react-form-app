import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useWizardForm } from "../hooks/useWizardForm"

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
      isValid,
      isSubmitting,
      errors
    }} = useForm<User>({
      mode: 'onChange'
    })
  const onSubmit: SubmitHandler<User> = (data) => alert(JSON.stringify(data))

  const forms =
    formItems
      .map((items, index) => (
        <BaseInputs
          key={index}
          register={register}
          errors={errors}
          formItems={items}
        />
      ))

  const { currentForm, isFirstStep, isLastStep, next, back } = useWizardForm(forms)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-48">
      {currentForm}
      <div>
        {!isFirstStep && <button type="button" onClick={back} disabled={!isValid || isSubmitting}>&lt;&lt;前へ</button>}
        {!isLastStep && <button type="button" onClick={next} disabled={!isValid || isSubmitting}>次へ&gt;&gt;</button>}
        {isLastStep && <button type="submit" disabled={!isValid || isSubmitting}>提出する</button>}
      </div>
    </form>
  )
}

export default Form
