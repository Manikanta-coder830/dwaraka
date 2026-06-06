import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'rooms'

    console.log('[v0] Upload request:', { fileName: file?.name, fileSize: file?.size, category })

    if (!file) {
      console.log('[v0] No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      console.log('[v0] Invalid file type:', file.type)
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.log('[v0] File too large:', file.size)
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    // Generate unique filename with category prefix
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `gallery/${category}/${timestamp}-${sanitizedName}`

    console.log('[v0] Uploading blob:', filename)

    // Use private access for the Blob store
    const blob = await put(filename, file, {
      access: 'private',
    })

    console.log('[v0] Upload successful:', { pathname: blob.pathname })

    return NextResponse.json({ 
      pathname: blob.pathname,
      category,
      success: true
    })
  } catch (error) {
    console.error('[v0] Upload error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
