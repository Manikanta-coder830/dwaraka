"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import { Upload } from "lucide-react"

interface GalleryImage {
  pathname: string
  category: string
  filename: string
  uploadedAt: string
}

const categoryLabels: Record<string, string> = {
  rooms: "Rooms",
  common: "Common Area",
  dining: "Dining",
  study: "Study Area",
  games: "Games Zone",
  events: "Events",
  exterior: "Exterior",
}



const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { data } = useSWR<{ files: GalleryImage[] }>("/api/gallery", fetcher)

  const uploadedImages = data?.files || []
  const hasImages = uploadedImages.length > 0

  const displayImages = uploadedImages.map((img) => ({
    pathname: img.pathname,
    category: img.category,
  }))

  const categories = hasImages 
    ? ["all", ...new Set(displayImages.map((img) => img.category))]
    : ["all"]

  const filteredImages =
    activeCategory === "all"
      ? displayImages
      : displayImages.filter((img) => img.category === activeCategory)

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Take a Look
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Life at Dwaraka Stays
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get a glimpse of our comfortable living spaces and modern facilities.
          </p>
          
          {/* Admin Upload Link */}
          <Link
            href="/admin/upload"
            className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Photos
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {category === "all" ? "All" : categoryLabels[category] || category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {hasImages ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.pathname}-${index}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-card border border-border"
              >
                <Image
                  src={`/api/file?pathname=${encodeURIComponent(image.pathname)}`}
                  alt={categoryLabels[image.category] || image.category}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">
                    {categoryLabels[image.category] || image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card/50 rounded-xl border border-border">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No photos yet</h3>
            <p className="text-muted-foreground mb-6">
              Upload photos to showcase your hostel spaces.
            </p>
            <Link
              href="/admin/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Photos
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
