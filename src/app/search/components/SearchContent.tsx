import { Song } from '@/shared/types/types'

interface SearchContentProps {
	songs: Song[]
}

const SearchContent = ({ songs }: SearchContentProps) => {
	if (songs.length === 0) {
		return <div className='mt-4 text-neutral-400'>No songs available.</div>
	}

	return (
		<div
			className='
        mt-4 
        grid 
        grid-cols-2 
        gap-4 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8
      '
		>
			{songs.map((item) => (
				<p>{item.title}</p>
				// <SongItem
				//   onClick={(id: string) => onPlay(id)}
				//   key={item.id}
				//   data={item}
				// />
			))}
		</div>
	)
}
export default SearchContent
