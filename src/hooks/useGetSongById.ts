import { convertTrackToSong } from '@/shared/helpers/convertObject'
import { Song } from '@/shared/types/types'
import { gql, useQuery } from '@apollo/client'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

const GET_TRACK_QUERY = gql`
	query MyQuery($trackId: String!) {
		getTrack(trackId: $trackId) {
			id
			preview_url
			name
			album {
				name
				images {
					url
				}
			}
			artists {
				name
				id
			}
		}
	}
`

const useSongById = (id?: string | number) => {
	const [isLoading, setIsLoading] = useState(false)
	const [song, setSong] = useState<Song | undefined>(undefined)
	const { supabaseClient } = useSessionContext()

	// Вызовите useQuery только если id является строкой
	const {
		data: gqlData,
		loading: gqlLoading,
		error: gqlError,
	} = useQuery(GET_TRACK_QUERY, {
		variables: { trackId: id },
		skip: typeof id === 'number', // Пропустить запрос, если это песня из Supabase
	})

	useEffect(() => {
		if (id === undefined) {
			return
		}

		if (typeof id === 'string') {
			// Обработка результатов GraphQL запроса
			if (gqlLoading) {
				setIsLoading(true)
				return
			}

			if (gqlError) {
				setIsLoading(false)
				toast.error(gqlError.message)
				return
			}

			if (gqlData) {
				// console.log(convertTrackToSong(gqlData.getTrack))
				setSong(convertTrackToSong(gqlData.getTrack))
				setIsLoading(false)
			}
		} else if (typeof id === 'number') {
			// Обращение к Supabase
			const fetchSong = async () => {
				setIsLoading(true)
				const { data, error } = await supabaseClient
					.from('songs')
					.select('*')
					.eq('id', id)
					.single()

				if (error) {
					setIsLoading(false)
					toast.error(error.message)
				} else {
					setSong(data as Song)
					setIsLoading(false)
				}
			}

			fetchSong()
		}
	}, [id, supabaseClient, gqlData, gqlLoading, gqlError])

	return useMemo(
		() => ({
			isLoading,
			song,
		}),
		[isLoading, song],
	)
}

export default useSongById
// import { Song } from '@/shared/types/types';
// import { gql } from '@apollo/client';
// import { useSessionContext } from '@supabase/auth-helpers-react';
// import { useEffect, useMemo, useState } from 'react';
// import { toast } from 'react-hot-toast';

// const query = gql`
// 	query MyQuery($trackId: String) {
// 		getTrack(trackId: $trackId) {
// 			preview_url
// 			name
// 		}
// 	}
// `

// const useSongById = (id?: string) => {
// 	console.log(typeof id)
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [song, setSong] = useState<Song | undefined>(undefined)
// 	const { supabaseClient } = useSessionContext()

// 	useEffect(() => {
// 		if (!id) {
// 			return
// 		}

// 		setIsLoading(true)

// 		const fetchSong = async () => {
// 			const { data, error } = await supabaseClient
// 				.from('songs')
// 				.select('*')
// 				.eq('id', id)
// 				.single()

// 			if (error) {
// 				setIsLoading(false)
// 				return toast.error(error.message)
// 			}

// 			setSong(data as Song)
// 			setIsLoading(false)
// 		}

// 		fetchSong()
// 	}, [id, supabaseClient])

// 	return useMemo(
// 		() => ({
// 			isLoading,
// 			song,
// 		}),
// 		[isLoading, song],
// 	)
// }

// export default useSongById
