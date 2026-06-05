import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { RoomsSection } from "@/components/rooms-section"
import { AmenitiesSection } from "@/components/amenities-section"
import { GallerySection } from "@/components/gallery-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <RoomsSection />
      <AmenitiesSection />
      <GallerySection />
      <FooterSection />
    </main>
  )
}
