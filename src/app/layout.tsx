import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player/Player'
import Sidebar from '@/components/Sidebar'
import ModalProvider from '@/providers/ModalProvider'
import PlayerProvider from '@/providers/PlayerProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import UserProvider from '@/providers/UserProvider'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Spotify Clone',
	description: 'Listen to music for free',
}

export const revalidate = 0

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const userSongs = await getSongsByUserId()
	return (
		<html lang='en'>
			<body className={font.className}>
				<ToasterProvider />
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider />
						<Sidebar songs={userSongs}>{children}</Sidebar>
						<PlayerProvider>
							<Player />
						</PlayerProvider>
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	)
}
