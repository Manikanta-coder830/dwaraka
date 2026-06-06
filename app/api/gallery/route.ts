import { list, del } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'gallery/',
    })

    const files = blobs.map((blob) => {
      // Extract category from pathname (gallery/category/filename)
      const parts = blob.pathname.split('/')
      const category = parts[1] || 'rooms'
      
      return {
        pathname: blob.pathname,
        category,
        filename: parts[parts.length - 1] || 'unknown',
        uploadedAt: blob.uploadedAt,
      }
    })

    return NextResponse.json({ files })
  } catch (error) {
    console.error('Error listing files:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = await request.json()

    if (!pathname) {
      return NextResponse.json({ error: 'No pathname provided' }, { status: 400 })
    }

    // Get the full URL for deletion
    const blobs = await list({ prefix: 'gallery/' })
    const blob = blobs.blobs.find(b => b.pathname === pathname)
    
    if (!blob) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    await del(blob.url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
