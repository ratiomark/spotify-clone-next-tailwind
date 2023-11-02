'use client'

import useAuthModal from '@/hooks/useAuthModal'
import useOnPlay from '@/hooks/useOnPlay'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import {
	SIZE_ICON_ADD_NEW_SONG,
	SIZE_ICON_DEFAULT,
} from '@/shared/constants/sizes'
import { Song } from '@/shared/types/types'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

import MediaItem from './Items/MediaItem'

interface LibraryProps {
	songs: Song[]
}

const Library = ({ songs }: LibraryProps) => {
	const authModal = useAuthModal()
	const uploadModal = useUploadModal()
	const { user } = useUser()
	const onPlay = useOnPlay(songs)

	const onClick = () => {
		if (!user) return authModal.onOpen()
		return uploadModal.onOpen()
	}
	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2'>
					<TbPlaylist
						className='text-neutral-400'
						size={SIZE_ICON_DEFAULT}
					/>
					<p className='text-md font-medium text-neutral-400'>Your Library</p>
				</div>
				<AiOutlinePlus
					className='cursor-pointer text-neutral-400 transition hover:text-white'
					onClick={onClick}
					size={SIZE_ICON_ADD_NEW_SONG}
				/>
			</div>
			<div
				className='
					mt-4
					flex
					flex-col
					gap-2
					px-3'
			>
				{songs.map((song) => (
					<MediaItem
						key={song.id}
						data={song}
						onClick={(id: string) => onPlay(id)}
					/>
				))}
			</div>
		</div>
	)
}
export default Library
