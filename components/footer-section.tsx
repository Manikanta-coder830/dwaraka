"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Instagram, Send, CheckCircle } from "lucide-react"

export function FooterSection() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    roomType: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Build WhatsApp message
    const roomLabels: Record<string, string> = {
      single: "Single Sharing - ₹20,000/month",
      double: "Double Sharing - ₹12,000/month",
      triple: "Triple Sharing - ₹9,500/month",
      fourshare: "4 Share - ₹7,000/month",
    }
    
    const message = `Hello! I'm interested in booking a room at Dwaraka Stays.

*Name:* ${formState.name}
*Phone:* ${formState.phone}
*Preferred Room:* ${roomLabels[formState.roomType] || formState.roomType}
${formState.message ? `*Message:* ${formState.message}` : ""}

Please contact me with more details.`

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/918074433048?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: "", phone: "", roomType: "", message: "" })
    }, 3000)
  }

  return (
    <footer id="contact" className="bg-card border-t border-border">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-widest">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              Ready to Move In?
            </h2>
            <p className="text-muted-foreground mb-10 text-pretty">
              Have questions or want to schedule a visit? Reach out to us directly 
              or fill out the inquiry form, and {"we'll"} get back to you within 24 hours.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Address</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Dwaraka Stays,<br />
                    Madhura Nagar, Shamshabad,<br />
                    Rangareddy District, Telangana 501218
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <a 
                    href="tel:+918074433048" 
                    className="text-primary hover:text-primary/80 transition-colors text-lg font-medium"
                  >
                    +91 8074433048
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Follow Us</h3>
                  <a 
                    href="https://instagram.com/dwaraka_stays" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    @dwaraka_stays
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-secondary/50 border border-border rounded-2xl p-8">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Quick Room Inquiry
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Fill out the form and {"we'll"} contact you shortly.
            </p>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-lg mb-2">
                  Inquiry Submitted!
                </h4>
                <p className="text-muted-foreground text-sm">
                  {"We'll"} get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    required
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="roomType" className="block text-sm font-medium text-foreground mb-2">
                    Preferred Room Type
                  </label>
                  <select
                    id="roomType"
                    value={formState.roomType}
                    onChange={(e) => setFormState({ ...formState, roomType: e.target.value })}
                    required
                    className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select room type</option>
                    <option value="single">Single Sharing - ₹20,000/month</option>
                    <option value="double">Double Sharing - ₹12,000/month</option>
                    <option value="triple">Triple Sharing - ₹9,500/month</option>
                    <option value="fourshare">4 Share - ₹7,000/month</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Any specific requirements or questions?"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold">D</span>
            </div>
            <span className="font-serif text-foreground font-semibold">
              Dwaraka Stays
            </span>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Dwaraka Stays. All rights reserved.
          </p>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <a href="#rooms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Rooms
            </a>
            <a href="#amenities" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Amenities
            </a>
            <a href="#gallery" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Gallery
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
