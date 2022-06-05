import { CircularProgress } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import ProtectedRoute from './ProtectedRoute'

const AuthWrapper = ({children}:{children: React.ReactNode}) => {
  const authRoute = ['/dashboard', '/']
    const {status} = useSession()
    const router = useRouter()
    if(status === 'loading') return (
      <div className='flex justify-center items-center w-full h-[100vh]'>
          <CircularProgress color="inherit" className='w-[12rem]'/>
    </div> 
  ) 
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