import { Song, Track } from '../types/types'

export const convertTrackToSong = (track: Track): Song => {
	return {
		id: track.id,
		author: track.artists[0].name,
		image_path: track?.album?.images[0]?.url,
		title: track.name,
		song_path: track.preview_url ?? '',
		user_id: '',
	}
}
