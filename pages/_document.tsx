import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  )
}
export default Document;