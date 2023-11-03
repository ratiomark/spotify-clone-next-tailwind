'use client'

import * as RadixSlider from '@radix-ui/react-slider'

interface VolumeSlideProps {
	value?: number
	onChange?: (value: number) => void
}

const VolumeSlider: React.FC<VolumeSlideProps> = ({ value = 1, onChange }) => {
	const handleChange = (newValue: number[]) => {
		onChange?.(newValue[0])
	}

	return (
		<RadixSlider.Root
			className='
        relative 
        flex 
        h-10 
        w-full 
        touch-none 
        select-none 
        items-center
      '
			defaultValue={[1]}
			value={[value]}
			onValueChange={handleChange}
			max={1}
			step={0.1}
			aria-label='Volume'
		>
			<RadixSlider.Track
				className='
          group 
          relative 
          h-[3px] 
          grow 
          cursor-pointer
					rounded-full
					bg-neutral-600
        '
			>
				<RadixSlider.Range
					className='
            absolute 
            h-full 
            rounded-full 
						bg-white
            transition
						group-hover:bg-green-400
          '
				/>
			</RadixSlider.Track>
		</RadixSlider.Root>
	)
}

export default VolumeSlider
