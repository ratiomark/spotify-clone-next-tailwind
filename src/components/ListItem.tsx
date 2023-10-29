'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
	image: string
	name: string
	href: string
}
const ListItem = ({ image, name, href }: ListItemProps) => {
	const router = useRouter()
	const onClick = () => {
		//add auth before push
		router.push(href)
	}
	return (
		<button className='group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20'>
			<div className='relative min-h-[64px] min-w-[64px] '>
				<Image
					className='object-cover'
					fill
					src={image}
					alt='image'
				/>
			</div>
			<p className='truncate py-5 font-medium'>{name}</p>
			<div className='absolute opacity-0 transition rounded-full flex  items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110'>
				<FaPlay />
			</div>
		</button>
	)
}
export default ListItem
