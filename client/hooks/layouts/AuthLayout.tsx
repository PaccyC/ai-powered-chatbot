import React, { ReactNode } from 'react'
import { useAuthContext } from '../useAuthContext'

const AuthLayout = ({children}:{ children: ReactNode}) => {
    const {user}= useAuthContext()
    if(user) return null;
  return (
    <main>
      {children}
    </main>
  )
}

export default AuthLayout