'use client'

import AuthModal from '@/components/AuthModal'
import { useEffect, useState } from 'react'

const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
	}, [])

	// похоже, что когда некст будет делать ssr, то в этом случае модалки не будут рендериться, потому что тут клиентский компонент в котором есть isMounted, так что моадлки будут рендериться только на клиенте
	if (!isMounted) return null

	return (
		<>
			<AuthModal />
		</>
	)
}
export default ModalProvider
