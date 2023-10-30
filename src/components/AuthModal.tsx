'use client'

import Modal from '@/components/Modal'
import useAuthModal from '@/hooks/useAuthModal'

const AuthModal = () => {
	const { isOpen, onClose, onOpen } = useAuthModal()
	onOpen()
	return (
		<Modal
			title='Welcome back'
			description='Login to your account'
			isOpen={isOpen}
			onChange={isOpen ? onClose : onOpen}
		>
			<div>Auth content</div>
		</Modal>
	)
}
export default AuthModal
