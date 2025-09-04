import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Image from 'next/image'
import { CheckCircleIcon, UserGroupIcon, TrophyIcon, ClockIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'About Brandenburg Data Consulting - Expert Data Solutions Team',
  description: 'Learn about Brandenburg Data Consulting, our mission, values, and the expert team behind our data consultancy services. Discover our approach to transforming data challenges into business opportunities.',
}

const teamValues = [
  {
    name: 'Expertise & Innovation',
    description: 'Combining deep technical knowledge with cutting-edge methodologies to deliver superior results.',
    icon: TrophyIcon,
  },
  {
    name: 'Client-First Approach',
    description: 'Every solution is tailored to meet your specific business objectives and requirements.',
    icon: UserGroupIcon,
  },
  {
    name: 'Proven Results',
    description: 'Track record of successful implementations across various industries and use cases.',
    icon: CheckCircleIcon,
  },
  {
    name: 'Continuous Support',
    description: 'Long-term partnership with ongoing support and optimization services.',
    icon: ClockIcon,
  },
]

const expertise = [
  'Advanced Analytics & Statistical Modeling',
  'Cloud Data Platforms (AWS, Azure, GCP)',
  'Machine Learning & AI Implementation', 
  'Real-time Data Processing & Streaming',
  'Data Governance & Compliance (GDPR, CCPA)',
  'Business Intelligence & Data Visualization',
  'ETL/ELT Pipeline Development',
  'Data Architecture & Database Design',
]

const teamMembers = [
  {
    name: 'Shahid H. Nasir',
    role: 'President',
    image: '/Shahid H. Nasir (President).png',
    bio: 'Strategic leader with extensive experience in data-driven business transformation and organizational growth.'
  },
  {
    name: 'Amna Ali',
    role: 'Founder',
    image: '/Amna Ali (Founder).png',
    bio: 'Visionary founder passionate about leveraging data science to solve complex business challenges.'
  },
  {
    name: 'Hassan Ali',
    role: 'Head of Data',
    image: '/Hassan Ali (Head of Data).png',
    bio: 'Expert data engineer specializing in scalable data architectures and advanced analytics solutions.'
  },
  {
    name: 'Noshaba Khan',
    role: 'Chief Operating Officer',
    image: '/Noshaba Khan (Cheif Operating Officer).png',
    bio: 'Operations expert ensuring seamless project delivery and exceptional client service experiences.'
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About Brandenburg Data Consulting
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We are data consultants dedicated to transforming complex business challenges 
              into strategic advantages through innovative data solutions and AI technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Main About Content */}
      <About />

      {/* Our Team Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our experienced team of data professionals brings diverse expertise and proven track records 
              in transforming data challenges into strategic business advantages.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative mx-auto h-32 w-32 mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover shadow-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm font-medium text-primary-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Values Section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Sets Us Apart
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our unique approach combines technical excellence with business acumen to deliver 
              solutions that drive measurable impact.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {teamValues.map((value) => (
                <div key={value.name} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 flex-shrink-0">
                      <value.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900">{value.name}</h3>
                      <p className="mt-2 text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Expertise */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Technical Expertise
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Deep knowledge across the entire data technology stack enables us to architect 
              comprehensive solutions tailored to your specific needs.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {expertise.map((skill) => (
                <div key={skill} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-primary-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Transform Your Data?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Let's discuss how we can help you unlock the full potential of your data assets 
                and drive meaningful business outcomes.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  Start a Conversation
                </a>
                <a href="/services" className="text-lg font-semibold leading-6 text-white">
                  View Our Services <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <div className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}