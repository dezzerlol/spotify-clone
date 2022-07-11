import React from 'react'
import AuthForm from '../components/AuthForm'
import SEO from '../components/SEO'

const Signin = () => {
  return (
    <>
      <SEO title='Sign in - Spotify' description='Sign in to spotify and listen music worldwide.' />
      <AuthForm mode='signin' />
    </>
  )
}

Signin.authPage = true

export default Signin
