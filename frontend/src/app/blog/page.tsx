import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Brandenburg Data Consulting Insights',
  description: 'Read our latest insights on data strategy, analytics, AI implementation, and digital transformation. Expert perspectives on leveraging data for business success.',
}

async function getBlogPosts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/blog`, {
      cache: 'no-store'
    })
    if (response.ok) {
      const data = await response.json()
      return data.posts || []
    }
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
  }
  return []
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Data Insights Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Expert perspectives on data strategy, analytics, and digital transformation. 
              Stay informed about the latest trends and best practices in data consulting.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-12">
              {blogPosts.map((post: any) => (
                <article key={post.id} className="border-b border-gray-200 pb-12 last:border-b-0">
                  <div className="flex items-center gap-4 mb-4">
                    <time className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <div className="flex gap-2">
                      {post.tags.split(', ').map((tag: string) => (
                        <span key={tag} className="inline-flex items-center rounded-md bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">By {post.author}</span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
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
                Need Data Consulting Help?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Our team is ready to help you implement the strategies and solutions discussed in our blog posts.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  Get Expert Help
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