'use client'

import Modal from '@/components/Modal'
import useUploadModal from '@/hooks/useUploadModal'
import {
	useSessionContext,
	useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const UploadModal = () => {
	const { isOpen, onClose, onOpen } = useUploadModal()
	const supabaseClient = useSupabaseClient()
	const router = useRouter()
	const { session } = useSessionContext()

	useEffect(() => {
		if (session) {
			router.refresh()
			onClose()
		}
	}, [session, router, onClose])

	const onChange = (open: boolean) => {
		if (!open) onClose()
	}

	return (
		<Modal
			title='Add a song'
			description='Upload an mp3 file'
			isOpen={isOpen}
			onChange={onChange}
		>
			<Auth
				theme='dark'
				magicLink
				providers={['github']}
				supabaseClient={supabaseClient}
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: '#404040',
								brandAccent: '#22c55e',
							},
						},
					},
				}}
			/>
		</Modal>
	)
}
export default UploadModal
