import { NextResponse } from 'next/server'

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } },
) {
	// DELETE
	// http://localhost:3000/api/songs/123
	const is = params.id
	// далее логика по удалению песни

	return NextResponse.json({ message: 'Song deleted' })
}
