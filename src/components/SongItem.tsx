'use client'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/shared/types/types'
import Image from 'next/image'

import PlayButton from './PlayButton'

interface SongItemProps {
	data: Song
	onClick: () => void
}
const SongItem = ({ data, onClick }: SongItemProps) => {
	const imagePath = useLoadImage(data)

	return (
		<div
			className='
			group
			relative
			flex
			cursor-pointer
			flex-col
			items-center
			justify-center
			gap-4
			overflow-hidden
			rounded-md
			bg-neutral-400/5
			p-3
			transition
			'
		>
			<div
				className='
				relative
				aspect-square
				h-full
				w-full
				overflow-hidden
				rounded-md
				'
			>
				<Image
					className='object-cover'
					fill
					src={imagePath ?? '/images/liked.png'}
					alt='cover'
				/>
			</div>
			<div className='flex w-full flex-col items-start gap-1 p-4'>
				<p className='w-full truncate font-semibold'>{data.title}</p>
				<p className='w-full truncate pb-4 text-sm text-neutral-400'>
					{data.author}
				</p>
			</div>
			<div className='absolute bottom-24 right-5'>
				<PlayButton />
			</div>
		</div>
	)
}
export default SongItem
