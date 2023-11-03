'use client'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";



const client = new ApolloClient({
	uri: 'https://alton.stepzen.net/api/sad-armadillo/__graphql',
	headers: {
		"Authorization": "apikey alton::stepzen.io+1000::438fbdf82adf544727dfea92b346186f51b38fc6ebc5f3833eed35b43110d5bc"
	},
	cache: new InMemoryCache()
})

export const ApolloClientProvider = ({ children }: PropsWithChildren) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)