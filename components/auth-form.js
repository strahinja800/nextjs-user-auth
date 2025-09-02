/* 'use client'

import { signup } from '@/actions/auth-action'
import Link from 'next/link'
import { useFormState } from 'react-dom'

export default function AuthForm() {
  const [formState, formAction] = useFormState(signup, {})

  return (
    <form
      id='auth-form'
      action={formAction}
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
        />
      </p>
      <p>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
        />
      </p>
      {formState.errors && (
        <ul id='form-errors'>
          {Object.keys(formState.errors).map(error => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type='submit'>Create Account</button>
      </p>
      <p>
        <Link href='/'>Login with existing account.</Link>
      </p>
    </form>
  )
}
 */

'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { signUp } from '@/actions/auth-action'

export default function AuthForm() {
  const [formState, formAction] = useFormState(signUp, {})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
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
  }, [formState, router, email, password])

  return (
    <form
      id='auth-form'
      action={formAction}
    >
      <div>
        <img src='/images/auth-icon.jpg' alt='A lock icon' />
      </div>
      <p>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </p>
      {formState.errors && (
        <ul id='form-errors'>
          {Object.keys(formState.errors).map(error => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type='submit'>Create Account</button>
      </p>
      <p>
        <Link href='/login'>Already have an accoun? Login.</Link>
      </p>
    </form>
  )
}
