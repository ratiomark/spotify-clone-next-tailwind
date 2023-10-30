'use client'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import toast from 'react-hot-toast'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import Button from './Button'

interface HeaderProps extends PropsWithChildren {
	className?: string
}

const Header = ({ className, children }: HeaderProps) => {
	const router = useRouter()
	const authModal = useAuthModal()
	const supabaseClient = useSupabaseClient()
	const { user } = useUser()

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut()
		// TODO: reset any played songs
		router.refresh()
		if (error) {
			toast.error(error.message)
		} else {
			toast.success('Logged out!')
		}
	}
	return (
		<div
			className={twMerge(
				'h-fit bg-gradient-to-b from-emerald-800 p-6',
				className,
			)}
		>
			<div className='mb-4 flex w-full items-center justify-between'>
				{/* web version */}
				<div className='hidden items-center gap-2 md:flex'>
					<button
						className='flex  items-center justify-center rounded-full bg-black transition hover:opacity-75'
						onClick={() => router.back()}
					>
						<RxCaretLeft
							className='text-white'
							size={35}
						/>
					</button>
					<button
						className='flex  items-center justify-center rounded-full bg-black transition hover:opacity-75'
						onClick={() => router.forward()}
					>
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
				<div className='flex items-center justify-between gap-4'>
					{user ? (
						<div className='flex items-center gap-4'>
							<Button
								className='bg-white  px-6 py-2'
								onClick={handleLogout}
							>
								Logout
							</Button>
							<Button
								onClick={() => router.push('/account')}
								className='bg-white'
							>
								<FaUserAlt />
							</Button>
						</div>
					) : (
						<>
							<div>
								<Button
									className='bg-transparent font-medium text-neutral-300'
									onClick={authModal.onOpen}
								>
									Sign up
								</Button>
							</div>
							<div>
								<Button
									className='bg-white px-6 py-2'
									onClick={authModal.onOpen}
								>
									Log in
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
			{children}
		</div>
	)
}
export default Header
