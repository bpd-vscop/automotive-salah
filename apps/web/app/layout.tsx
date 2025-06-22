// filepath: automotive-salah/apps/web/app/layout.tsx
import type { Metadata } from 'next'



import './globals.css'







export const metadata: Metadata = {



  title: 'Automotive Locksmith Platform',



  description: 'Professional B2B automotive locksmith supplies',



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






