import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useState, createContext } from 'react';
import AppContext from '../components/AppContext';
import { Roboto } from '@next/font/google'

const Robotofont = Roboto({
  subsets: ['latin'],
  weight: '400'

})

export default function App({ Component, pageProps }: AppProps) {
  const [nameContext, setNameContext] = useState('default')
  return (
    <AppContext.Provider value={{ nameContext, setNameContext }}>
      <main className={Robotofont.className}>

        <Component {...pageProps} />
      </main>
    </AppContext.Provider>
  )
}
