import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import '../styles.css'
import { AuthProvider } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ChatBot from '../components/ChatBot'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'مجمع الشفاء الطبي - رعاية صحية متكاملة بأعلى المعايير العالمية' },
      { name: 'theme-color', content: '#E53E3E' },
      { title: 'مجمع الشفاء الطبي' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatBot />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  )
}
