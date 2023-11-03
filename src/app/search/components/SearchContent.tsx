'use client'

import MediaItemGQL from '@/components/Items/MediaItemGQL'
import SongItem from '@/components/Items/SongItem'
import LikeButton from '@/components/LikeButton'
import Spinner from '@/components/Spinner'
import useOnPlay from '@/hooks/useOnPlay'
import { convertTrackToSong } from '@/shared/helpers/convertObject'
import { Song } from '@/shared/types/types'
import { gql, useQuery } from '@apollo/client'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const search = gql`
	query MyQuery($q: String, $offset: Int) {
		search(q: $q, offset: $offset) {
			tracks {
				items {
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
		}
	}
`

interface SearchContentProps {
	songs?: Song[]
	q?: string
}

// const SearchContent = ({ songs }: SearchContentProps) => {
const SearchContent = (props: SearchContentProps) => {
	const searchParams = useSearchParams()
	const q = searchParams.get('title')
	const [offset, setOffset] = useState(0)
	const { data, loading, error, fetchMore } = useQuery(search, {
		variables: { q, offset },
	})
	const tracks = data?.search?.tracks?.items ?? []
	const songs = tracks.map(convertTrackToSong)
	const { ref, inView } = useInView({
		/* Optional options */
		threshold: 0.5,
	})

	useEffect(() => {
		console.log('loading   ', loading)
	}, [loading])

	const onPlay = useOnPlay(songs)

	useEffect(() => {
		console.log('offset', offset)
	}, [offset])

	const loadMoreSongs = async () => {
		const newOffset = offset + 50
		await fetchMore({
			variables: { q, offset: newOffset },
		})
		setOffset(newOffset)
	}

	useEffect(() => {
		if (inView) {
			loadMoreSongs()
		}
	}, [inView])

	if (songs.length === 0) {
		return (
			<div
				className='
          flex 
          w-full 
          flex-col 
          gap-y-2 
          px-6 
          text-neutral-400
        '
			>
				No songs found.
				{loading && (
					<div className='flex min-h-[40px] w-full items-center justify-center bg-slate-600'>
						<Spinner />
					</div>
				)}
			</div>
		)
	}

	return (
		<div className='flex w-full flex-col gap-y-2 px-6'>
			{songs.map((song: Song, index: number) => {
				if (index === songs.length - 10) {
					return (
						<div
							ref={ref}
							key={song.id}
							className='flex w-full items-center gap-x-4'
						>
							<div className='flex-1'>
								<MediaItemGQL
									onClick={(id: string) => onPlay(id)}
									data={song}
								/>
							</div>
							<LikeButton songId={song.id} />
						</div>
					)
				} else {
					return (
						<div
							key={song.id}
							className='flex w-full items-center gap-x-4'
						>
							<div className='flex-1'>
								<MediaItemGQL
									onClick={(id: string) => onPlay(id)}
									data={song}
								/>
							</div>
							<LikeButton songId={song.id} />
						</div>
					)
				}
			})}
			{loading && (
				<div className='flex min-h-[40px] w-full items-center justify-center'>
					<Spinner />
				</div>
			)}
		</div>
	)
}
export default SearchContent
// 'use client';

// import MediaItem from '@/components/Items/MediaItem';
// import SongItem from '@/components/Items/SongItem';
// import LikeButton from '@/components/LikeButton';
// import useOnPlay from '@/hooks/useOnPlay';
// import { Song } from '@/shared/types/types';
// import { gql, useQuery } from '@apollo/client';

// const query = gql`
// 	query MyQuery($q: String) {
// 		search(q: $q) {
// 			tracks {
// 				items {
// 					id
// 					preview_url
// 					name
// 					album {
// 						name
// 						images {
// 							url
// 						}
// 					}
// 					artists {
// 						name
// 						id
// 					}
// 				}
// 			}
// 		}
// 	}
// `

// interface SearchContentProps {
// 	songs?: Song[]
// 	q?: string
// }

// const SearchContent = (props: SearchContentProps) => {
// 	const { data: songs, loading, error } = useQuery(query, { variables: { q: props.q } })
// 	const tracks = songs?.search?.tracks?.items ?? []

// 	// return <d
// 	// const SearchContent = ({ songs }: SearchContentProps) => {
// 	const onPlay = useOnPlay(songs)

// 	if (songs.length === 0) {
// 		return (
// 			<div
// 				className='
//           flex
//           w-full
//           flex-col
//           gap-y-2
//           px-6
//           text-neutral-400
//         '
// 			>
// 				No songs found.
// 			</div>
// 		)
// 	}

// 	return (
// 		<div className='flex w-full flex-col gap-y-2 px-6'>
// 			{songs.map((song: Song) => (
// 				<div
// 					key={song.id}
// 					className='flex w-full items-center gap-x-4'
// 				>
// 					<div className='flex-1'>
// 						<MediaItem
// 							onClick={(id: string) => onPlay(id)}
// 							data={song}
// 						/>
// 					</div>
// 					<LikeButton songId={song.id} />
// 				</div>
// 			))}
// 		</div>
// 	)
// }
// export default SearchContent
