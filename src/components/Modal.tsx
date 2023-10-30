import * as Dialog from '@radix-ui/react-dialog'
import { PropsWithChildren } from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalProps extends PropsWithChildren {
	isOpen: boolean
	onChange: (open: boolean) => void
	title: string
	description: string
}
const Modal = ({
	isOpen,
	description,
	onChange,
	title,
	children,
}: ModalProps) => {
	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={onChange}
			defaultOpen={isOpen}
		>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-neutral-900/90  backdrop-blur-sm' />
				<Dialog.Content className='fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full'>
					<Dialog.Title>{title}</Dialog.Title>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
export default Modal
