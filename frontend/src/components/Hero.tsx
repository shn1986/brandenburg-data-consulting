'use client'

import Link from 'next/link'
import { ChartBarIcon, CpuChipIcon, CircleStackIcon, LightBulbIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const features = [
    {
      name: 'Data Modeling',
      description: 'Strategic data architecture design',
      icon: CircleStackIcon,
    },
    {
      name: 'Data Transformation',
      description: 'Efficient ETL and data pipeline solutions',
      icon: ChartBarIcon,
    },
    {
      name: 'Agentic AI Solutions',
      description: 'Cutting-edge AI-powered automation',
      icon: CpuChipIcon,
    },
    {
      name: 'Strategic Consulting',
      description: 'Data-driven business insights',
      icon: LightBulbIcon,
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Unlock the Power of
              <span className="block text-accent-400">Data Intelligence</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200 max-w-3xl mx-auto">
              Transform your business with cutting-edge data solutions. We deliver enterprise-grade analytics, 
              AI implementation, and strategic insights that drive measurable growth.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-900 shadow-xl hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300"
              >
                Get Started Today
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                href="/services" 
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Core Expertise</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive data solutions tailored to your business needs</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 group-hover:bg-primary-700 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-primary-900 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Delivering Measurable Impact</h2>
            <p className="text-lg text-primary-200">Our data-driven solutions create tangible business value</p>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent-400 mb-2">99%</div>
              <div className="text-lg font-semibold text-white mb-1">Data Accuracy</div>
              <div className="text-sm text-primary-200">Improvement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent-400 mb-2">50%</div>
              <div className="text-lg font-semibold text-white mb-1">Processing Time</div>
              <div className="text-sm text-primary-200">Reduction Average</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-accent-400 mb-2">25+</div>
              <div className="text-lg font-semibold text-white mb-1">Successful Projects</div>
              <div className="text-sm text-primary-200">Delivered This Year</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}