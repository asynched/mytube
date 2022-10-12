import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preventDefault } from 'src/utils/events'
import { signIn } from 'src/services/http/auth'
import { updateApplicationAuthState } from 'src/shared/stores/auth'

import { PlayCircleIcon } from '@heroicons/react/24/solid'

export default function Login() {
  const navigate = useNavigate()
  const [isErr, setIsErr] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const updateAuth = async (token: string) => {
    await updateApplicationAuthState(token)
    navigate('/')
  }

  const handleSignIn = async () => {
    const form = formRef.current!

    const formData = new FormData(form)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const data = await signIn(email, password)

      await updateAuth(data.token)
    } catch (error) {
      console.error('Error signing in', error)
      setIsErr(true)
    }
  }

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="py-16 px-4 border w-full max-w-[24rem] flex flex-col items-center">
        <h3 className="flex gap-1 items-center text-2xl font-bold tracking-tighter">
          <PlayCircleIcon className="w-6 h-6 text-red-600" />
          MyTube
        </h3>
        <h1 className="my-4 text-3xl font-bold tracking-tighter">
          Entre na sua conta
        </h1>
        <form
          onSubmit={preventDefault(handleSignIn)}
          ref={formRef}
          className="grid gap-4"
        >
          <div>
            <p className="mb-2 font-medium">Email</p>
            <input
              className={`border outline-none py-2 px-4 transition ease-in-out ${
                isErr && 'border-transparent ring-2 ring-red-600'
              }`}
              type="text"
              id="email"
              name="email"
              placeholder="you@mail.com"
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Senha</p>
            <input
              className={`border outline-none py-2 px-4 transition ease-in-out ${
                isErr && 'border-transparent ring-2 ring-red-600'
              }`}
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>
          <a className="ml-auto text-sm text-blue-600 hover:underline" href="/">
            Esqueci minha senha
          </a>
          <button className="py-2 text-white bg-red-600 transition ease-in-out hover:bg-red-500">
            Login
          </button>
          <a
            className="text-sm text-center text-blue-600 hover:underline"
            href="/"
          >
            Registrar
          </a>
        </form>
      </div>
    </div>
  )
}
