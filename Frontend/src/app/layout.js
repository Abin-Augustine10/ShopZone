import './globals.css'

export const metadata = {
  title: 'ShopZone - Premium E-commerce Store',
  description: 'Discover amazing products at unbeatable prices. Your one-stop shop for everything you need!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}