'use client'

import { useState } from 'react'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const services = [
    'Data Modeling & Architecture',
    'Data Transformation & ETL',
    'Agentic AI Solutions',
    'Cloud Data Solutions',
    'Business Intelligence',
    'Data Strategy Consulting',
    'Other',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-20 sm:py-24 bg-white" id="contact">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600 uppercase tracking-wide">Get In Touch</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Start Your Data Journey</p>
          <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            Ready to unlock the potential of your data? Let's discuss how we can transform your challenges into competitive advantages.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="lg:pr-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-10">Let's Connect</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 mr-6 flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Email Us</p>
                  <p className="text-gray-600">hello@brandenburgdata.com</p>
                  <p className="text-sm text-gray-500 mt-1">We typically respond within 4 hours</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 mr-6 flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Call Us</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500 mt-1">Monday - Friday, 9 AM - 6 PM EST</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 mr-6 flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">Location</p>
                  <p className="text-gray-600">Remote & On-site Available</p>
                  <p className="text-sm text-gray-500 mt-1">Serving clients globally</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-6">Why Partner With Us?</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-accent-300 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Enterprise-grade data solutions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-accent-300 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Proven ROI and measurable results</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-accent-300 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible engagement models</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-accent-300 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>End-to-end project support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:pl-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Service of Interest
                </label>
                <select
                  name="service"
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements, timeline, and goals..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="text-sm text-green-700">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">
                    There was an error sending your message. Please try again or email us directly.
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}