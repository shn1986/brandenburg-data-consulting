import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { notFound } from 'next/navigation'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  tags: string
  created_at: string
  updated_at: string
  featured_image?: string
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/blog/${slug}`, {
      cache: 'no-store'
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
  }
  return null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - Brandenburg Data Consulting',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} - Brandenburg Data Consulting Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const tags = post.tags.split(', ')

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Article Header */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <time className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="text-sm text-gray-500">By {post.author}</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>
          
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-md bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg prose-gray max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Unique Data Visualizations for each blog post */}
          <div className="mt-12 space-y-12">
            {post.slug === 'why-data-is-new-oil' && (
              <>
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    Exponential Growth of Global Data Creation
                  </h3>
                  <div className="flex justify-center">
                    <Image 
                      src="/data-growth-chart.svg" 
                      alt="Global Data Creation Growth Chart" 
                      width={600} 
                      height={400}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    The explosive growth in data creation demonstrates why data has become the most valuable business asset
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    The Data Value Pyramid
                  </h3>
                  <div className="flex justify-center">
                    <Image 
                      src="/data-value-pyramid.svg" 
                      alt="Data Value Pyramid" 
                      width={600} 
                      height={450}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Data becomes exponentially more valuable as organizations transform it into strategic insights
                  </p>
                </div>
              </>
            )}
            
            {post.slug === 'evolution-data-driven-companies' && (
              <>
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    The Four Stages of Data Maturity
                  </h3>
                  <div className="flex justify-center">
                    <Image 
                      src="/data-maturity-stages.svg" 
                      alt="Data Maturity Evolution Stages" 
                      width={700} 
                      height={400}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Companies progress through distinct stages, with each advancement delivering significantly higher ROI
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    Evolution Timeline: From Reactive to Predictive
                  </h3>
                  <div className="flex justify-center">
                    <Image 
                      src="/predictive-analytics-timeline.svg" 
                      alt="Predictive Analytics Evolution Timeline" 
                      width={700} 
                      height={400}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    The evolution from asking "what happened?" to "what will happen?" represents the future of business intelligence
                  </p>
                </div>
              </>
            )}
            
            {post.slug === 'roi-of-data-analytics' && (
              <>
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    Data-Driven vs Traditional Company Performance
                  </h3>
                  <div className="flex justify-center">
                    <Image 
                      src="/roi-comparison-chart.svg" 
                      alt="ROI Comparison Chart" 
                      width={600} 
                      height={400}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Data-driven companies consistently outperform traditional companies across all key metrics
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    Investment vs ROI: Finding the Sweet Spot
                  </h3>
                  <div className="flex justify-center">
                    <Image 
                      src="/investment-roi-simple.svg" 
                      alt="Data Analytics Investment ROI Curve" 
                      width={600} 
                      height={400}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Strategic investment in analytics capabilities yields exponentially increasing returns
                  </p>
                </div>
              </>
            )}
          </div>
          
          {/* Author Info */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-600">BDC</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-900">{post.author}</p>
                <p className="text-gray-600">Expert Data Consulting Team</p>
                <p className="text-sm text-gray-500 mt-1">
                  Helping businesses transform data challenges into strategic advantages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts CTA */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
            Explore More Data Insights
          </h2>
          <p className="text-gray-600 mb-8">
            Discover more expert perspectives on data strategy and digital transformation
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
          >
            View All Blog Posts
          </Link>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Implement These Strategies?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Let's discuss how we can help you implement the data strategies and solutions 
                discussed in this article for your specific business needs.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  Get Expert Consultation
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