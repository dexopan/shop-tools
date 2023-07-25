import type { Metadata } from 'next'
import ReduxProvider from '@/store/provider'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
	title: 'Tools Store',
	description: 'Generated by create next app',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ReduxProvider>
					{children}
					<ToastContainer
						position="bottom-right"
						hideProgressBar={false}
						closeOnClick
						rtl={false}
						limit={1}
						theme="light"
					/>
				</ReduxProvider>
			</body>
		</html>
	)
}
