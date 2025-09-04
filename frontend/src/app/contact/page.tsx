import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Brandenburg Data Consulting - Get Expert Data Solutions',
  description: 'Contact Brandenburg Data Consulting for expert data modeling, AI solutions, and comprehensive analytics services. Request a consultation to transform your data challenges into opportunities.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Let's Start a Conversation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ready to transform your data challenges into strategic advantages? 
              We're here to help you unlock the full potential of your data assets.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Component */}
      <ContactForm />

      <Footer />
    </main>
  )
}