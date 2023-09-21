'use client'
import Header from '@/components/modules/Header/Header'
import Footer from '@/components/modules/Footer/Footer'


export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}