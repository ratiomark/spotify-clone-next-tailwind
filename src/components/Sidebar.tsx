'use client'

import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/shared/types/types'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'

import Box from './Box'
import SidebarItem from './Items/SidebarItem'
import Library from './Library'

interface SideBarProps extends PropsWithChildren {
	songs: Song[]
}

const Sidebar = ({ children, songs }: SideBarProps) => {
	const pathname = usePathname()
	const player = usePlayer()

	const routes = useMemo(
		() => [
			{
				label: 'Home',
				active: pathname !== '/search',
				href: '/',
				icon: HiHome,
			},
			{
				label: 'Search',
				active: pathname === '/search',
				href: '/search',
				icon: BiSearch,
			},
		],
		[pathname],
	)

	return (
		<div
			className={twMerge(
				`
			flex
			h-full
		`,
				player.activeId && 'h-[calc(100%-80px)]',
			)}
		>
			<div className='hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex'>
				<Box>
					<div className='flex flex-col gap-y-4 px-5 py-4'>
						{routes.map((item) => (
							<SidebarItem
								key={item.label}
								{...item}
							/>
						))}
					</div>
				</Box>
				<Box className='h-full overflow-y-auto'>
					<Library songs={songs} />
				</Box>
			</div>
			<main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
		</div>
	)
}
export default Sidebar
