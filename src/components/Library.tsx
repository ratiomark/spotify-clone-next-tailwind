'use client'

import {
	SIZE_ICON_ADD_NEW_SONG,
	SIZE_ICON_DEFAULT,
} from '@/shared/constants/sizes'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

const Library = () => {
	const onClick = () => {}
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
			<div className='mt-4 flex flex-col gap-2 px-3'>List of Song</div>
		</div>
	)
}
export default Library
