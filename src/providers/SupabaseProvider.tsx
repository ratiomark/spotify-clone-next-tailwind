'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { PropsWithChildren, useState } from 'react'

import { Database } from '../../types_db'

const SupabaseProvider = ({ children }: PropsWithChildren) => {
	const [supabaseClient] = useState(() =>
		createClientComponentClient<Database>(),
	)
	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			{children}
		</SessionContextProvider>
	)
}
export default SupabaseProvider
