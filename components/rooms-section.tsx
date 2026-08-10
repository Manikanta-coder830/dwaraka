"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Users } from "lucide-react"

const rooms = [
  {
    title: "Single Sharing",
    occupancy: 1,
    price: "₹20,000",
    features: [
      "Private room",
      "Attached bathroom",
      "Study desk & chair",
      "Wardrobe storage",
      "AC included extra 3000",
    ],
    popular: false,
  },
  {
    title: "Double Sharing",
    occupancy: 2,
    price: "₹12,000",
    features: [
      "Shared room",
      "Attached bathroom",
      " study desk",
      "Personal wardrobe",
      "AC included extra 3000",
    ],
    popular: true,
  },
  {
    title: "Triple Sharing",
    occupancy: 3,
    price: "₹9,500",
    features: [
      "Shared room",
      "Attached bathroom",
      "Study area",
      "Locker storage",
      
    ],
    popular: false,
  },
  {
    title: "4 Share",
    occupancy: 4,
    price: "₹7,000",
    features: [
      "Shared room",
      "Common bathroom",
      
      "Locker storage",
      "Fan ",
    ],
    popular: false,
  },
]

export function RoomsSection() {
  return (
    <section id="rooms" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Accommodations
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Choose Your Space
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            From budget-friendly triple sharing to premium single rooms, 
            find the perfect accommodation that fits your lifestyle and budget.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.title}
              className={`relative bg-card border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 ${
                room.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {room.popular && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    {room.occupancy} {room.occupancy === 1 ? "Person" : "Persons"}
                  </span>
                </div>
                <CardTitle className="font-serif text-2xl text-foreground">
                  {room.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-primary">{room.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full ${
                    room.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
                >
                  <a href="#contact">Book Now</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
