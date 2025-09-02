'use server'
import { createUser } from '@/lib/user'

export async function signUp(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  let errors = {}

  if (!email || !email.includes('@')) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!password || password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.'
  }
  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  try {
    await createUser(email, password)
  } catch (error) {
    if (error.code === 'P2002') {
      return {
        errors: { email: 'Account with provided email already exists.' },
      }
    }
    return {
      errors: { message: 'Something went wrong! Try again later.' },
    }
  }

  // if everything is fine, return success message
  return { success: true }
}
