import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import ProtectedRoute from './ProtectedRoute'


const authRoute = ['/dashboard', '/']

const AuthWrapper = ({children}:{children: React.ReactNode}) => {
    const {status} = useSession()
    const router = useRouter()
    if(status === 'loading') return <>'Loading...'</>
  return (
    <>{
        authRoute.includes(router.pathname) ? (
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        ) : (children)
    }</>
  )
}

export default AuthWrapper