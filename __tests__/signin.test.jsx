import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import User from '../pages/user/[id]'

describe('Signin page', () => {
  const initialState = { activeSongs: [], activeSong: null, user: {}, sidebarPlaylists: [{}], playlist: [{}] }
  const mockStore = configureStore()
  let store

  it('renders a signin page', async () => {
    store = mockStore(initialState)
    const wrapper = render(
      <Provider store={store}>
        <User />
      </Provider>
    )

    // const submitButton = await wrapper.findByText('Sign in')
    // await submitButton.click()

    expect(wrapper.container).toMatchSnapshot()
  })
})
