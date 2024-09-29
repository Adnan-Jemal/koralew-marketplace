import React from 'react'
import { Button } from '../ui/button'
import { signIn } from '@/auth'


export default function SignInForm() {
  return (
    <div className='p-12 border-2 rounded-lg border-secondary-foreground bg-current flex flex-col gap-5'>
      <form action={async ()=>{
        'use server'
         await signIn('google')
      }}><Button>Sign in With Google</Button></form>
        
      <form action={async ()=>{
        'use server'
         await signIn('github')
      }}><Button>Sign in With Github</Button></form>
        
    </div>
  )
}
