import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/shared/types/types'
import Image from 'next/image'

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
			<Image
				fill
				src={imagePath ?? ''}
				alt='cover'
			/>
		</div>
	)
}
export default SongItem
