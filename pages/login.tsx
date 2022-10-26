import Head from 'next/head'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'

import React from 'react'
import useAuth from '../hooks/useAuth'
interface Inputs {
  email: string
  password: string
}
function login() {
  const { signUp, signIn } = useAuth()
  const [login, setLogin] = React.useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-center text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 font-light text-orange-500 ">
                Please enter a valid email address
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="password"
              className="input"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="p-1 font-light text-orange-500 ">
                Please enter your password
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#e50914] py-3"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix ?{' '}
          <button
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign Up Now
          </button>
        </div>
      </form>{' '}
    </div>
  )
}

export default login
