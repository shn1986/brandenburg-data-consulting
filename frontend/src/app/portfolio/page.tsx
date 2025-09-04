import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Portfolio - Brandenburg Data Consulting Case Studies',
  description: 'Explore our successful data consulting projects and case studies. See how we\'ve helped companies transform their data challenges into strategic advantages.',
}

async function getPortfolioItems() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/portfolio`, {
      cache: 'no-store'
    })
    if (response.ok) {
      const data = await response.json()
      return data.portfolio || []
    }
  } catch (error) {
    console.error('Failed to fetch portfolio:', error)
  }
  return []
}

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems()

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Portfolio
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover how we've helped companies across industries transform their data challenges 
              into strategic advantages and measurable business outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Items */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-16">
            {portfolioItems.map((item: any, index: number) => (
              <div key={item.id} className={`flex flex-col lg:flex-row gap-12 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center rounded-md bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                      {item.industry}
                    </span>
                    <span className="text-sm text-gray-500">{item.client}</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                    {item.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {item.description}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h3>
                      <p className="text-gray-600">{item.challenge}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Solution</h3>
                      <p className="text-gray-600">{item.solution}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Results</h3>
                      <p className="text-gray-600">{item.results}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.split(', ').map((tech: string) => (
                          <span key={tech} className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 lg:w-96">
                  <div className="rounded-lg bg-gradient-to-br from-primary-50 to-gray-50 p-8 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircleIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-900">Project Completed</p>
                      <p className="text-sm text-gray-600 mt-2">Successful Implementation</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Start Your Data Journey?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Let's discuss how we can help transform your data challenges into competitive advantages.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  Start a Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}