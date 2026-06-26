import '../styles/globals.css';

export const metadata = {
  title: 'Gulshan Groups',
  description: 'Gulshan Groups - Premium real estate in Noida and Greater Noida',
  icons: {
    icon: '/assets/images/gglogo.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
