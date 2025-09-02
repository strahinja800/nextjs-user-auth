'use client'

/* import { useEffect } from 'react' */
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
/* import { useFormState } from 'react-dom' */
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { signUp /* logIn */ } from '@/actions/auth-action'

export default function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'login'
  const isLogin = mode === 'login'

  const [error, setError] = useState('')
  /*   const [password, setPassword] = useState('') */

  async function handleSubmit(event) {
    event.preventDefault()
    setError('') // Reset error message

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (isLogin) {
      // LOGIN LOGIC

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result.error) {
        setError('Invalid email or password')
      } else {
        router.push('/training')
      }
    } else {
      // SIGNUP LOGIC
      const result = await signUp(null, formData)

      if (result.errors) {
        setError(Object.values(result.errors).join(', '))
      } else {
        const loginResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (loginResult.error) {
          setError('Automatic login failed after signup.')
        } else {
          router.push('/training')
        }
      }
    }
  }

  /* const [formState, formAction] = useFormState(isLogin ? logIn : signUp, {}) */

  /*   useEffect(() => {
    if (formState.success) {
      signIn('credentials', {
        email,
        password,
        redirect: false,
      }).then(result => {
        if (result.error) {
          alert('Automatic login failed after signup.')
        } else {
          router.push('/training')
        }
      })
    }
  }, [formState, router, email, password]) */

  return (
    <form
      id='auth-form'
      onSubmit={handleSubmit}
    >
      <div>
        <img
          src='/images/auth-icon.jpg'
          alt='A lock icon'
        />
      </div>
      <p>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          /* value={email}
          onChange={e => setEmail(e.target.value)} */
          required
        />
      </p>
      <p>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          /* value={password}
          onChange={e => setPassword(e.target.value)} */
          required
        />
      </p>
      {/* {formState.errors && (
        <ul id='form-errors'>
          {Object.keys(formState.errors).map(error => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )} */}
      {error && <p id='form-errors'>{error}</p>}
      <p>
        {isLogin && <button type='submit'>Login</button>}
        {!isLogin && <button type='submit'>Create Account</button>}
      </p>
      <p>
        {isLogin && <Link href='/?mode=signup'>Create new account.</Link>}
        {!isLogin && (
          <Link href='/?mode=login'>Login with existing account.</Link>
        )}
      </p>
    </form>
  )
}

{
  /* {mode === 'login' && (
          <Link href='/?mode=signup'>Create new account.</Link>
        )}
        {mode === 'signup' && (
          <Link href='/?mode=login'>Login with existing account.</Link>
        )} */
}
