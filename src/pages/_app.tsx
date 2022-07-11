import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import PageLayout from '../components/PageLayout'
import store from '../store/store'
import '../styles/globals.css'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },

  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        )}
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
