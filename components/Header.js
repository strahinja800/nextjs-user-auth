'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <button onClick={signOut}>Logout</button>
      ) : (
        <Link href={'/?mode=login'}>Login</Link>
      )}
    </>
  )
}
