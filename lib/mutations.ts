import fetcher from './fetcher'

// send signin request to nextjs api with body email and password
export const auth = (mode: 'signin' | 'signup', body: { email: string; password: string }) => {
  return fetcher(`/${mode}`, body)
}
