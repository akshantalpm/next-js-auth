import '../styles/globals.css'
import { Provider } from 'next-auth/client'
function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      {console.log(pageProps)}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
