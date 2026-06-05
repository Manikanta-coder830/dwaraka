"use client"

import { Wifi, Utensils, Shield, Zap, Droplets, Car, Tv, Wind, Dumbbell, BookOpen, Gamepad2 } from "lucide-react"

const amenities = [
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi",
    description: "Blazing fast internet for streaming and studying",
  },
  {
    icon: Utensils,
    title: "Daily Meals",
    description: "Nutritious breakfast, lunch & dinner included",
  },
  {
    icon: Shield,
    title: "24/7 Security",
    description: "CCTV surveillance and security personnel",
  },
  {
    icon: Zap,
    title: "Power Backup",
    description: "Uninterrupted power supply with generator",
  },
  {
    icon: Droplets,
    title: "Hot Water",
    description: "24/7 hot water availability in all bathrooms",
  },
  {
    icon: Car,
    title: "Parking Space",
    description: "Secure parking for bikes and vehicles",
  },
  {
    icon: Tv,
    title: "Common Room",
    description: "TV lounge and recreation area",
  },
  {
    icon: Wind,
    title: "Laundry Service",
    description: "Washing machine and ironing facilities",
  },
  {
    icon: Dumbbell,
    title: "Fitness Area",
    description: "Basic gym equipment for your workouts",
  },
  {
    icon: BookOpen,
    title: "Study Hall",
    description: "Quiet study space available 24/7",
  },
  {
    icon: Gamepad2,
    title: "Games Zone",
    description: "Indoor games and recreation activities",
  },
]

export function AmenitiesSection() {
  return (
    <section id="amenities" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Premium Amenities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need for a comfortable and productive stay, 
            all under one roof.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.title}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <amenity.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                {amenity.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
