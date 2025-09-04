'use client'

import { useState } from 'react'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CheckCircleIcon, ExclamationCircleIcon, CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ContactForm {
  first_name: string
  last_name: string
  email: string
  company: string
  phone: string
  service: string
  message: string
  budget_range: string
  timeline: string
  contact_method: string
  preferred_date: string
  preferred_time: string
}

const services = [
  'Data Strategy Consulting',
  'Data Modeling & Architecture', 
  'Data Transformation & ETL',
  'Agentic AI Solutions',
  'Machine Learning Implementation',
  'Cloud Data Solutions',
  'Business Intelligence & Analytics',
  'Data Migration Projects',
  'Training & Workshops',
  'General Inquiry'
]

const budgetRanges = [
  'Under $10,000',
  '$10,000 - $50,000', 
  '$50,000 - $100,000',
  '$100,000 - $250,000',
  '$250,000+',
  'To be discussed'
]

const timelines = [
  'Immediate (< 1 month)',
  '1-3 months',
  '3-6 months', 
  '6-12 months',
  '12+ months',
  'Flexible/Planning stage'
]

const contactMethods = [
  'Email',
  'Phone call',
  'Video conference',
  'In-person meeting',
  'No preference'
]

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactForm>({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
    budget_range: '',
    timeline: '',
    contact_method: '',
    preferred_date: '',
    preferred_time: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setMessage('Thank you for your message! We\'ll get back to you within 24 hours.')
        // Reset form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
          budget_range: '',
          timeline: '',
          contact_method: '',
          preferred_date: '',
          preferred_time: ''
        })
      } else {
        setSubmitStatus('error')
        setMessage(result.message || 'Failed to send message')
      }
    } catch (error) {
      setSubmitStatus('error')
      setMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Contact Information Section */}
        <div className="mx-auto max-w-4xl mb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <EnvelopeIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">hello@brandenburgdata.com</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <PhoneIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <MapPinIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Remote & On-site Available</p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ready to transform your data challenges into strategic advantages? Tell us about your project 
            and let's explore how we can help you achieve your data goals.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {submitStatus === 'success' && (
            <div className="mb-8 rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{message}</p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{message}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name *
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email *
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                Company
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Project Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Project Information
              </h3>

              <div>
                <label htmlFor="service" className="block text-sm font-medium leading-6 text-gray-900">
                  Service of Interest *
                </label>
                <div className="mt-2">
                  <select
                    name="service"
                    id="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                  Project Description *
                </label>
                <div className="mt-2">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements, challenges, and goals..."
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
                <div>
                  <label htmlFor="budget_range" className="block text-sm font-medium leading-6 text-gray-900">
                    Budget Range
                  </label>
                  <div className="mt-2">
                    <select
                      name="budget_range"
                      id="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Timeline
                  </label>
                  <div className="mt-2">
                    <select
                      name="timeline"
                      id="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select timeline</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="contact_method" className="block text-sm font-medium leading-6 text-gray-900">
                  Preferred Contact Method
                </label>
                <div className="mt-2">
                  <select
                    name="contact_method"
                    id="contact_method"
                    value={formData.contact_method}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select contact method</option>
                    {contactMethods.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Calendar functionality */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <CalendarDaysIcon className="h-5 w-5 text-primary-600 mr-2" />
                  Schedule a Call (Optional)
                </h3>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="preferred_date" className="block text-sm font-medium leading-6 text-gray-900">
                      Preferred Date
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="preferred_date"
                        id="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferred_time" className="block text-sm font-medium leading-6 text-gray-900">
                      Preferred Time
                    </label>
                    <div className="mt-2">
                      <select
                        name="preferred_time"
                        id="preferred_time"
                        value={formData.preferred_time}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select time slot</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  <ClockIcon className="h-4 w-4 inline mr-1" />
                  Available Monday-Friday, 9 AM - 5 PM EST. We'll confirm your preferred time via email.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              * Required fields. We typically respond within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}