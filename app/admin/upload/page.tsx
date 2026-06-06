"use client"

import { useState, useCallback } from "react"
import { Upload, X, Check, ImagePlus, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import useSWR, { mutate } from "swr"

const categories = [
  { id: "rooms", label: "Rooms" },
  { id: "common", label: "Common Areas" },
  { id: "dining", label: "Dining" },
  { id: "study", label: "Study Hall" },
  { id: "games", label: "Games Zone" },
  { id: "exterior", label: "Exterior" },
]

interface GalleryImage {
  url: string
  pathname: string
  category: string
  filename: string
  uploadedAt: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AdminUploadPage() {
  const [selectedCategory, setSelectedCategory] = useState("rooms")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string[]>([])
  const [deleting, setDeleting] = useState<string | null>(null)

  const { data, error, isLoading } = useSWR<{ files: GalleryImage[] }>("/api/gallery", fetcher)

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      setUploading(true)
      setUploadProgress([])

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const statusIndex = uploadProgress.length

        // Add initial status
        setUploadProgress((prev) => [...prev, `Uploading ${file.name}...`])

        const formData = new FormData()
        formData.append("file", file)
        formData.append("category", selectedCategory)

        try {
          console.log('[v0] Sending upload request:', { name: file.name, size: file.size })

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          console.log('[v0] Upload response status:', res.status)
          const data = await res.json()
          console.log('[v0] Upload response:', data)

          if (res.ok && data.success) {
            setUploadProgress((prev) => {
              const newProgress = [...prev]
              newProgress[statusIndex] = `✓ Uploaded ${file.name}`
              return newProgress
            })
          } else {
            const errorMsg = data.error || 'Upload failed'
            console.error('[v0] Upload failed:', errorMsg)
            setUploadProgress((prev) => {
              const newProgress = [...prev]
              newProgress[statusIndex] = `✗ ${file.name}: ${errorMsg}`
              return newProgress
            })
          }
        } catch (error) {
          console.error('[v0] Upload error:', error)
          const errorMsg = error instanceof Error ? error.message : 'Connection error'
          setUploadProgress((prev) => {
            const newProgress = [...prev]
            newProgress[statusIndex] = `✗ ${file.name}: ${errorMsg}`
            return newProgress
          })
        }
      }

      setUploading(false)
      setTimeout(() => {
        mutate("/api/gallery")
      }, 500)
      
      // Clear the input
      e.target.value = ""
    },
    [selectedCategory]
  )

  const handleDelete = async (url: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    setDeleting(url)
    try {
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (res.ok) {
        mutate("/api/gallery")
      }
    } catch (error) {
      console.error("Delete failed:", error)
    }
    setDeleting(null)
  }

  const groupedImages = data?.files?.reduce(
    (acc, img) => {
      if (!acc[img.category]) {
        acc[img.category] = []
      }
      acc[img.category].push(img)
      return acc
    },
    {} as Record<string, GalleryImage[]>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Site</span>
            </Link>
          </div>
          <h1 className="text-xl font-semibold">Photo Upload</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-primary" />
            Upload New Photos
          </h2>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm text-muted-foreground mb-2">
              Select Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <label className="block cursor-pointer">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 hover:bg-secondary/30 transition-all">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                Tap to select photos
              </p>
              <p className="text-sm text-muted-foreground">
                Select multiple photos at once
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>

          {/* Upload Progress */}
          {uploadProgress.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadProgress.map((status, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm"
                >
                  {status.startsWith("Uploading") ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : status.startsWith("✓") ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className={status.startsWith("✗") ? "text-red-500" : "text-muted-foreground"}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-6">Uploaded Photos</h2>

          {isLoading && (
            <div className="text-center py-12 text-muted-foreground">
              Loading photos...
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-500">
              Failed to load photos
            </div>
          )}

          {!isLoading && !error && (!data?.files || data.files.length === 0) && (
            <div className="text-center py-12 text-muted-foreground">
              No photos uploaded yet. Start by uploading some photos above.
            </div>
          )}

          {groupedImages &&
            Object.entries(groupedImages).map(([category, images]) => (
              <div key={category} className="mb-8 last:mb-0">
                <h3 className="text-md font-medium mb-4 capitalize text-primary">
                  {categories.find((c) => c.id === category)?.label || category}{" "}
                  ({images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((img) => (
                    <div
                      key={img.pathname}
                      className="relative group aspect-square rounded-lg overflow-hidden bg-secondary"
                    >
                      <Image
                        src={img.url}
                        alt={img.filename}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => handleDelete(img.url)}
                        disabled={deleting === img.url}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                      >
                        {deleting === img.url ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}
