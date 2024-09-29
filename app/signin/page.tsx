import { auth } from '@/auth'
import SignInForm from '@/components/forms/SignInForm'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Page() {
  const session = await auth();
  if(session?.user){
    redirect('/')
  }
  return (
    <div className=' h-screen w-full flex items-center justify-center'><SignInForm/></div>
  )
}