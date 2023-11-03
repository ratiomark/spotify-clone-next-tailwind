'use client'

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	TypePolicies,
} from '@apollo/client'
import { PropsWithChildren } from 'react'

const template = { tracks: { items: [] } }
const typePolicies: TypePolicies = {
	Query: {
		fields: {
			search: {
				keyArgs: false,
				merge(existing = template, incoming) {
					// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
					// console.log(existing)
					// console.log(incoming)
					// return existing
					return {
						// search: {
						tracks: {
							items: [
								...existing?.tracks?.items,
								...incoming?.tracks?.items,
								// ...existing?.search?.tracks?.items,
								// ...incoming?.search?.tracks?.items,
							],
						},
						// },
					}
				},
			},
		},
	},
}
const client = new ApolloClient({
	uri: 'https://alton.stepzen.net/api/sad-armadillo/__graphql',
	headers: {
		Authorization:
			'apikey alton::stepzen.io+1000::438fbdf82adf544727dfea92b346186f51b38fc6ebc5f3833eed35b43110d5bc',
	},
	cache: new InMemoryCache({ typePolicies }),
})

export const ApolloClientProvider = ({ children }: PropsWithChildren) => (
	<ApolloProvider client={client}>{children}</ApolloProvider>
)
