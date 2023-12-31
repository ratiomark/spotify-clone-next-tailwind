'use client'

import useGetSongById from '@/hooks/useGetSongById'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import usePlayer from '@/hooks/usePlayer'

import PlayerContent from './PlayerContent'
import PlayerNoSound from './PlayerNoSound'

// import PlayerContent from './PlayerContent'

const Player = () => {
	const player = usePlayer()
	// console.log('active id   ', player.activeId)
	const { song, isLoading } = useGetSongById(player.activeId)

	const songUrl = useLoadSongUrl(song!)
	// const songUrl = useLoadSongUrl(song!)

	if (!song || !player.activeId) {
		return null
	}

	// if (songUrl === '') {
	// 	return <PlayerNoSound />
	// }

	return (
		<div
			className='
        fixed 
        bottom-0 
        h-[80px] 
        w-full 
        bg-black 
        px-4 
        py-2
      '
		>
			<PlayerContent
				// юзаю key для того чтобы компонент перерендеривался при смене песни, use-sound package не предоставляет такой возможности
				key={songUrl}
				isLoading={isLoading}
				song={song}
				songUrl={songUrl}
			/>
		</div>
	)
}

export default Player
