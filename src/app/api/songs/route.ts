import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	// Get the search params from the request
	const { searchParams } = new URL(request.url)
	// http://localhost:3000/api/songs?q=hello
	const query = searchParams.get('q')
	// query = 'hello'



	return NextResponse.json({
		songs: [
			{ title: 'Song 1' },
			{ title: 'Song 2' },
			{ title: 'Song 3' },
		],
	})
}
