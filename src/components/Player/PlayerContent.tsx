'use client'

import usePlayer from '@/hooks/usePlayer'
import { usePlayerVolume } from '@/providers/PlayerProvider'
import { Song } from '@/shared/types/types'
import { useEffect, useState } from 'react'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
// @ts-ignore
import useSound from 'use-sound'

import MediaItem from '../Items/MediaItem'
import MediaItemGQL from '../Items/MediaItemGQL'
import LikeButton from '../LikeButton'
import Spinner from '../Spinner'
import VolumeSlider from './VolumeSlider'

// import Slider from './Slider'

interface PlayerContentProps {
	song: Song
	songUrl: string
	isLoading: boolean
}

const PlayerContent: React.FC<PlayerContentProps> = ({
	song,
	songUrl,
	isLoading: isSongLoading,
}) => {
	const player = usePlayer()
	const { volume, setVolume, toggleMute } = usePlayerVolume()

	const [isPlaying, setIsPlaying] = useState(false)
	// console.log(songUrl)
	const SongLoadingIcon = <Spinner />
	const Icon = isPlaying ? BsPauseFill : BsPlayFill
	const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

	const onPlayNext = () => {
		if (player.ids.length === 0) {
			return
		}

		const currentIndex = player.ids.findIndex((id) => id === player.activeId)
		const nextSong = player.ids[currentIndex + 1]

		if (!nextSong) {
			return player.setId(player.ids[0])
		}

		player.setId(nextSong)
	}

	const onPlayPrevious = () => {
		if (player.ids.length === 0) {
			return
		}

		const currentIndex = player.ids.findIndex((id) => id === player.activeId)
		const previousSong = player.ids[currentIndex - 1]

		if (!previousSong) {
			return player.setId(player.ids[player.ids.length - 1])
		}

		player.setId(previousSong)
	}

	const [play, { pause, sound }] = useSound(songUrl, {
		volume: volume,
		onplay: () => setIsPlaying(true),
		onend: () => {
			setIsPlaying(false)
			onPlayNext()
		},
		onpause: () => setIsPlaying(false),
		format: ['mp3'],
	})

	useEffect(() => {
		sound?.play()

		return () => {
			sound?.unload()
		}
	}, [sound])

	const handlePlay = () => {
		if (!isPlaying) {
			play()
		} else {
			pause()
		}
	}

	const mainController = (
		<>
			<div
				className='
            col-auto 
            flex 
            w-full 
            items-center 
            justify-end 
            md:hidden
          '
			>
				<div
					onClick={handlePlay}
					className='
              flex
              h-10
              w-10 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1
            '
				>
					<Icon
						size={30}
						className='
						text-black
						'
					/>
				</div>
			</div>

			<div
				className='
            hidden
            h-full
            w-full 
            max-w-[722px] 
            items-center 
            justify-center 
            gap-x-6 
            md:flex
          '
			>
				<AiFillStepBackward
					onClick={onPlayPrevious}
					size={30}
					className='
              cursor-pointer 
              text-neutral-400 
              transition 
              hover:text-white
            '
				/>
				<div
					onClick={handlePlay}
					className='
							group
              flex 
              h-10 
              w-10
              cursor-pointer
              items-center 
              justify-center 
              rounded-full 
              bg-white 
							p-1
							transition
							duration-300
              hover:bg-green-500
            '
				>
					{isSongLoading && <Spinner />}
					{!isSongLoading && (
						<Icon
							size={30}
							className='
						text-black
						'
						/>
					)}
				</div>
				<AiFillStepForward
					onClick={onPlayNext}
					size={30}
					className='
              cursor-pointer 
              text-neutral-400 
              transition 
              hover:text-white
            '
				/>
			</div>
		</>
	)

	const noMusicInYouCountry = (
		<div className='flex w-full items-center justify-center'>
			<h3 className=''>Sorry, Spotify API has no mp3 file for this song</h3>
		</div>
	)

	return (
		<div
			className='
				grid
				h-full
				grid-cols-2
				md:grid-cols-3'
		>
			{/* <audio
				src={songUrl}
				controls
			/> */}
			<div className='flex w-full justify-start'>
				<div className='flex items-center gap-x-4'>
					<MediaItemGQL data={song} />
					<LikeButton songId={song && song.id} />
				</div>
			</div>

			{songUrl !== '' && mainController}
			{songUrl === '' && noMusicInYouCountry}

			<div className='hidden w-full justify-end pr-2 md:flex'>
				<div className='flex w-[120px] items-center gap-x-2'>
					<VolumeIcon
						onClick={toggleMute}
						className='cursor-pointer hover:text-green-500'
						size={34}
					/>
					<VolumeSlider
						value={volume}
						onChange={(value) => setVolume(value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default PlayerContent
// 'use client'

// import usePlayer from '@/hooks/usePlayer'
// import { usePlayerVolume } from '@/providers/PlayerProvider'
// import { Song } from '@/shared/types/types'
// import { useEffect, useState } from 'react'
// import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
// import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
// import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
// // @ts-ignore
// import useSound from 'use-sound'

// import MediaItem from '../Items/MediaItem'
// import LikeButton from '../LikeButton'
// import VolumeSlider from './VolumeSlider'

// // import Slider from './Slider'

// interface PlayerContentProps {
// 	song: Song
// 	songUrl: string
// }

// const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
// 	const player = usePlayer()
// 	const { volume, setVolume, toggleMute } = usePlayerVolume()

// 	const [isPlaying, setIsPlaying] = useState(false)
// 	console.log(songUrl)
// 	const Icon = isPlaying ? BsPauseFill : BsPlayFill
// 	const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

// 	const onPlayNext = () => {
// 		if (player.ids.length === 0) {
// 			return
// 		}

// 		const currentIndex = player.ids.findIndex((id) => id === player.activeId)
// 		const nextSong = player.ids[currentIndex + 1]

// 		if (!nextSong) {
// 			return player.setId(player.ids[0])
// 		}

// 		player.setId(nextSong)
// 	}

// 	const onPlayPrevious = () => {
// 		if (player.ids.length === 0) {
// 			return
// 		}

// 		const currentIndex = player.ids.findIndex((id) => id === player.activeId)
// 		const previousSong = player.ids[currentIndex - 1]

// 		if (!previousSong) {
// 			return player.setId(player.ids[player.ids.length - 1])
// 		}

// 		player.setId(previousSong)
// 	}

// 	// const [play, { pause, sound }] = useSound(songUrl, {
// 	// 	volume: volume,
// 	// 	onplay: () => setIsPlaying(true),
// 	// 	onend: () => {
// 	// 		setIsPlaying(false)
// 	// 		onPlayNext()
// 	// 	},
// 	// 	onpause: () => setIsPlaying(false),
// 	// 	format: ['mp3'],
// 	// })

// 	// useEffect(() => {
// 	// 	sound?.play()

// 	// 	return () => {
// 	// 		sound?.unload()
// 	// 	}
// 	// }, [sound])

// 	// const handlePlay = () => {
// 	// 	if (!isPlaying) {
// 	// 		play()
// 	// 	} else {
// 	// 		pause()
// 	// 	}
// 	// }

// 	// const toggleMute = () => {
// 	// 	if (volume === 0) {
// 	// 		setVolume(1)
// 	// 	} else {
// 	// 		setVolume(0)
// 	// 	}
// 	// }

// 	return (
// 		<div
// 			className='
// 				grid
// 				h-full
// 				grid-cols-2
// 				md:grid-cols-3'
// 		>
// 			<audio
// 				src={songUrl}
// 				controls
// 			/>
// 			{/* <div className='flex w-full justify-start'>
// 				<div className='flex items-center gap-x-4'>
// 					<MediaItem data={song} />
// 					<LikeButton songId={song && song.id} />
// 				</div>
// 			</div>

// 			<div
// 				className='
//             col-auto
//             flex
//             w-full
//             items-center
//             justify-end
//             md:hidden
//           '
// 			>
// 				<div
// 					onClick={handlePlay}
// 					className='
//               flex
//               h-10
//               w-10
//               cursor-pointer
//               items-center
//               justify-center
//               rounded-full
//               bg-white
//               p-1
//             '
// 				>
// 					<Icon
// 						size={30}
// 						className='
// 						text-black
// 						'
// 					/>
// 				</div>
// 			</div>

// 			<div
// 				className='
//             hidden
//             h-full
//             w-full
//             max-w-[722px]
//             items-center
//             justify-center
//             gap-x-6
//             md:flex
//           '
// 			>
// 				<AiFillStepBackward
// 					onClick={onPlayPrevious}
// 					size={30}
// 					className='
//               cursor-pointer
//               text-neutral-400
//               transition
//               hover:text-white
//             '
// 				/>
// 				<div
// 					onClick={handlePlay}
// 					className='
// 							group
//               flex
//               h-10
//               w-10
//               cursor-pointer
//               items-center
//               justify-center
//               rounded-full
//               bg-white
// 							p-1
// 							transition
// 							duration-300
//               hover:bg-green-500
//             '
// 				>
// 					<Icon
// 						size={30}
// 						className='
// 						text-black
// 						'
// 					/>
// 				</div>
// 				<AiFillStepForward
// 					onClick={onPlayNext}
// 					size={30}
// 					className='
//               cursor-pointer
//               text-neutral-400
//               transition
//               hover:text-white
//             '
// 				/>
// 			</div>

// 			<div className='hidden w-full justify-end pr-2 md:flex'>
// 				<div className='flex w-[120px] items-center gap-x-2'>
// 					<VolumeIcon
// 						onClick={toggleMute}
// 						className='cursor-pointer hover:text-green-500'
// 						size={34}
// 					/>
// 					<VolumeSlider
// 						value={volume}
// 						onChange={(value) => setVolume(value)}
// 					/>
// 				</div>
// 			</div> */}
// 		</div>
// 	)
// }

// export default PlayerContent
