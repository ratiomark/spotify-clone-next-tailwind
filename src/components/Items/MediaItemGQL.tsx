import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/shared/types/types'
import Image from 'next/image'

interface MediaItemProps {
	onClick?: (id: string) => void
	data: Song
}

const MediaItemGQL = ({ data, onClick }: MediaItemProps) => {
	const imageUrl = data.image_path

	const handleClick = () => {
		if (onClick) {
			return onClick(data.id)
		}
	}

	return (
		<div
			onClick={handleClick}
			className='
        flex 
        w-full 
        cursor-pointer 
        items-center 
        gap-x-3 
        rounded-md 
        p-2 
        hover:bg-neutral-800/50
      '
		>
			<div
				className='
          relative 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden 
          rounded-md
        '
			>
				<Image
					fill
					src={imageUrl || '/images/music-placeholder.png'}
					alt='MediaItem'
					className='object-cover'
				/>
			</div>
			<div className='flex flex-col gap-y-1 overflow-hidden'>
				<p className='truncate text-white'>{data.title}</p>
				<p className='truncate text-sm text-neutral-400'>By {data.author}</p>
			</div>
		</div>
	)
}
export default MediaItemGQL
