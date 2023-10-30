import Sidebar from '@/components/Sidebar'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import './globals.css'
import ToasterProvider from '@/providers/ToasterProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Spotify Clone',
	description: 'Listen to music for free',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<ToasterProvider/>
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider />
						<Sidebar>{children}</Sidebar>
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	)
}
