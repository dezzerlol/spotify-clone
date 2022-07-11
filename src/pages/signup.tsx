import React from 'react'
import AuthForm from '../components/AuthForm'
import SEO from '../components/SEO'

const Signup = () => {
  return (
    <>
      <SEO title='Sign up - Spotify' description='Sign up to spotify and listen music worldwide.' />
      <AuthForm mode='signup' />
    </>
  )
}

Signup.authPage = true

export default Signup
