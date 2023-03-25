import '@/styles/globals.css';
import '@/styles/auth.css';
import '@/styles/Navbar.css';
import '@/styles/contacts.css';
import '@/styles/home.css';
import '@/styles/profile.css';
import '@/styles/requests.css';
import '@/styles/reports.css';

export default function App({ Component, pageProps }) {

  return (
  <>
    <Component {...pageProps} />
  </>
  )
}
