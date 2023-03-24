import '@/styles/globals.css';
import '@/styles/auth.css';
import '@/styles/Navbar.css';
import '@/styles/contacts.css';

export default function App({ Component, pageProps }) {

  return (
  <>
    <Component {...pageProps} />
  </>
  )
}
