import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { User } from "../types/user"

const ErrorMessage = () => <span className="text-red-700">入力必須です</span>

const Form: FC = () => {
  const { handleSubmit, register, getValues, formState: { errors, isValid, isSubmitting }} = useForm<User>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<User> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-48">
      <label htmlFor="name">
        ユーザー名
        <input
          type="text"
          id="name"
          { ...register('name', { required: true }) }
        />
      </label>
      {errors.name &&
        <ErrorMessage />
      }

      <label htmlFor="nickname">
        ニックネーム
        <input
          type="text"
          id="nickname"
          { ...register('nickname', { minLength: 4 }) }
        />
      </label>
      {errors.nickname &&
        <span className="text-red-700">4文字以上で入力してください</span>
      }

      <label htmlFor="password">
        パスワード
        <input
          type="password"
          id="password"
          { ...register('password', { pattern: /\w{6,}/ }) }
        />
      </label>
      {errors.password &&
        <span className="text-red-700">半角英数字6文字以上で入力してください</span>
      }

      <label htmlFor="passwordConfirmation">
        確認用
        <input
          type="password"
          id="passwordConfirmation"
          { ...register('passwordConfirmation', {
              validate: (value) => (
                value === getValues('password') ||
                'パスワードと一致しません'
              )
            })
          }
        />
      </label>
      {errors.passwordConfirmation &&
        <span className="text-red-700">{errors.passwordConfirmation.message}</span>
      }
      <input type="submit" value="提出する" disabled={!isValid || isSubmitting} />
    </form>
  )
}

export default Form
