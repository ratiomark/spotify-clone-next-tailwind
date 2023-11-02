import { SIZE_ICON_DEFAULT } from '@/shared/constants/sizes'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface SidebarItemProps {
	label: string
	active: boolean
	href: string
	icon: IconType
	className?: string
}

const SidebarItem = ({
	active,
	label,
	className,
	href,
	icon: Icon,
}: SidebarItemProps) => {
	return (
		<Link
			className={twMerge(
				'text-md flex h-auto w-full cursor-pointer items-center gap-x-4 py-1 font-medium text-neutral-400 hover:text-white',
				active && 'text-white',
				className,
			)}
			href={href}
		>
			<Icon size={SIZE_ICON_DEFAULT} />
			<p className='w-full truncate'>{label}</p>
		</Link>
	)
}

export default SidebarItem
