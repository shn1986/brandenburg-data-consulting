import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Blog Post Not Found
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
            >
              View All Blog Posts
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}