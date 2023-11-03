import { Song } from '@/shared/types/types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const useLoadSongUrl = (song: Song) => {
	const supabaseClient = useSupabaseClient()

	if (!song) {
		return ''
	}

	if (song.song_path.startsWith('https://p.scdn.co') || song.song_path === '') {
		return song.song_path
	}

	const { data: songData } = supabaseClient.storage
		.from('songs')
		.getPublicUrl(song.song_path)

	return songData.publicUrl
}

export default useLoadSongUrl
