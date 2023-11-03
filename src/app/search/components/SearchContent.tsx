'use client';

import MediaItemGQL from '@/components/Items/MediaItemGQL'
import SongItem from '@/components/Items/SongItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';
import { convertTrackToSong } from '@/shared/helpers/convertObject';
import { Song } from '@/shared/types/types';
import { gql, useQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';


const query = gql`
	query MyQuery($q: String) {
		search(q: $q) {
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

// track?.album?.images[0]?.url
// track.artists[0]?.name ?? 'N\\A'
// track.name
const SearchContent = (props: SearchContentProps) => {
	// console.log(props)
	const searchParams = useSearchParams()
	const q = searchParams.get('title')
	const { data, loading, error } = useQuery(query, { variables: { q } })
	const tracks = data?.search?.tracks?.items ?? []
	const songs = tracks.map(convertTrackToSong)

	// console.log(songs)
	// return <d
	// const SearchContent = ({ songs }: SearchContentProps) => {
	const onPlay = useOnPlay(songs)
	// return (<div>
	// 	<h3>Тест</h3>

	// </div>)

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
			</div>
		)
	}

	return (
		<div className='flex w-full flex-col gap-y-2 px-6'>
			{songs.map((song: Song) => (
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
			))}
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