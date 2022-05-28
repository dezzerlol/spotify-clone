import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'

const Container404 = styled.div``

const FourOFour = () => {
  return (
    <Container404>
      <h1>404 - Page Not Found</h1>
      <Link href='/' passHref>
        <a>Go back</a>
      </Link>
    </Container404>
  )
}

FourOFour.authPage = true

export default FourOFour
