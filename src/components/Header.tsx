'use client'

import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

interface HeaderProps extends PropsWithChildren {
	className?: string
}

const Header = ({ className, children }: HeaderProps) => {
	const router = useRouter()
	const handleLogout = () => {}
	return (
		<div
			className={twMerge(
				'h-fit bg-gradient-to-b from-emerald-800 p-6',
				className,
			)}>
			<div className='mb-4 flex w-full items-center justify-between'>
				{/* web version */}
				<div className='hidden items-center gap-2 md:flex'>
					<button
						className='flex  items-center justify-center rounded-full bg-black transition hover:opacity-75'
						onClick={() => router.back()}>
						<RxCaretLeft
							className='text-white'
							size={35}
						/>
					</button>
					<button
						className='flex  items-center justify-center rounded-full bg-black transition hover:opacity-75'
						onClick={() => router.forward()}>
						<RxCaretRight
							className='text-white'
							size={35}
						/>
					</button>
				</div>

				{/* mobile version */}
				<div className='flex items-center gap-2 md:hidden'>
					<button className='flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75'>
						<HiHome
							className='text-black'
							size={20}
						/>
					</button>
					<button className='flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75'>
						<BiSearch
							className='text-black'
							size={20}
						/>
					</button>
				</div>
				<div className='flex '>
					 
				</div>
			</div>
		</div>
	)
}
export default Header
