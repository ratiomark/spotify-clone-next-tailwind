'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';


interface PlayerContextType {
	volume: number
	setVolume: (value: number) => void
	toggleMute: () => void
}

const PlayerContext = createContext<PlayerContextType>({
	volume: 1,
	setVolume: () => {},
	toggleMute: () => {},
})

const PlayerProvider = ({ children }: PropsWithChildren) => {
	const [volume, setVolume] = useState(0.6)
	const toggleMute = () => {
		if (volume === 0) {
			setVolume(0.6)
		} else {
			setVolume(0)
		}
	}

	return (
		<PlayerContext.Provider value={{ volume, setVolume , toggleMute}}>
			{children}
		</PlayerContext.Provider>
	)
}

export const usePlayerVolume = () => {
	const context = useContext(PlayerContext)
	if (context === undefined) {
		throw new Error('usePlayer must be used within a PlayerProvider')
	}
	return context
}

export default PlayerProvider