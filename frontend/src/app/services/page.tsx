import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Services from '@/components/Services'
import { 
  CircleStackIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  CloudIcon,
  CogIcon,
  PresentationChartLineIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Data Consulting Services - Brandenburg Data Consulting',
  description: 'Comprehensive data consulting services including data modeling, ETL pipelines, Agentic AI solutions, cloud data platforms, and business intelligence. Transform your data challenges into opportunities.',
}

const serviceDetails = [
  {
    id: 'data-modeling',
    name: 'Data Modeling & Architecture',
    description: 'Design robust, scalable data models that serve as the foundation for your business intelligence and analytics initiatives.',
    icon: CircleStackIcon,
    features: [
      'Conceptual & Logical Data Models',
      'Database Design & Optimization',
      'Data Warehouse Architecture',
      'Performance Tuning & Indexing',
      'Normalization & Denormalization',
      'Data Relationship Mapping'
    ],
    benefits: [
      'Improved data consistency and integrity',
      'Faster query performance',
      'Reduced storage costs',
      'Better scalability for future growth'
    ],
    process: [
      'Requirements Analysis',
      'Data Discovery & Profiling',
      'Conceptual Model Design',
      'Physical Implementation',
      'Testing & Validation',
      'Documentation & Training'
    ]
  },
  {
    id: 'data-transformation',
    name: 'Data Transformation & ETL',
    description: 'Streamline your data pipelines with efficient extraction, transformation, and loading processes that ensure data quality.',
    icon: ChartBarIcon,
    features: [
      'ETL Pipeline Development',
      'Data Quality Assurance',
      'Real-time Data Processing',
      'Batch Processing Systems',
      'Data Validation & Cleansing',
      'Migration Services'
    ],
    benefits: [
      'Automated data processing workflows',
      'Improved data quality and reliability',
      'Reduced manual effort and errors',
      'Real-time insights and reporting'
    ],
    process: [
      'Current State Assessment',
      'Pipeline Architecture Design',
      'Development & Testing',
      'Performance Optimization',
      'Monitoring Setup',
      'Documentation & Handover'
    ]
  },
  {
    id: 'ai-solutions',
    name: 'Agentic AI Solutions',
    description: 'Implement cutting-edge AI agents that automate complex processes and provide intelligent insights for your business.',
    icon: CpuChipIcon,
    features: [
      'AI Agent Development',
      'Process Automation',
      'Natural Language Processing',
      'Machine Learning Integration',
      'Predictive Analytics',
      'Intelligent Decision Support'
    ],
    benefits: [
      'Automated complex decision making',
      'Reduced operational costs',
      'Faster response times',
      '24/7 intelligent assistance'
    ],
    process: [
      'Use Case Identification',
      'AI Model Development',
      'Agent Training & Validation',
      'Integration & Deployment',
      'Performance Monitoring',
      'Continuous Improvement'
    ]
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Comprehensive data solutions designed to transform your business processes, 
              improve decision-making, and drive sustainable growth through intelligent data utilization.
            </p>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <Services />

      {/* Detailed Service Breakdown */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Service Deep Dive
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Detailed breakdown of our core services and how they can benefit your organization.
            </p>
          </div>

          {serviceDetails.map((service, index) => (
            <div key={service.id} id={service.id} className="mb-24">
              <div className={`grid grid-cols-1 gap-16 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 mr-4">
                      <service.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{service.name}</h3>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center">
                            <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-gray-50 rounded-lg p-8 space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h4>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start">
                            <div className="h-2 w-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Our Process</h4>
                      <ol className="space-y-3">
                        {service.process.map((step, stepIndex) => (
                          <li key={step} className="flex items-start">
                            <div className="h-6 w-6 bg-primary-100 text-primary-600 rounded-full text-sm font-medium flex items-center justify-center mr-3 flex-shrink-0">
                              {stepIndex + 1}
                            </div>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Technology Stack
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We leverage industry-leading technologies to deliver robust, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <CloudIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cloud Platforms</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Amazon Web Services (AWS)</li>
                <li>Microsoft Azure</li>
                <li>Google Cloud Platform</li>
                <li>Snowflake</li>
                <li>Databricks</li>
              </ul>
            </div>

            <div className="text-center">
              <CircleStackIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Technologies</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Apache Spark</li>
                <li>Apache Kafka</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Apache Airflow</li>
              </ul>
            </div>

            <div className="text-center">
              <CpuChipIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI & ML Frameworks</h3>
              <ul className="space-y-2 text-gray-600">
                <li>TensorFlow</li>
                <li>PyTorch</li>
                <li>Scikit-learn</li>
                <li>Hugging Face</li>
                <li>LangChain</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Let's discuss your specific needs and create a customized solution that 
                drives real business value.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  Request Consultation
                </a>
                <a href="/portfolio" className="text-lg font-semibold leading-6 text-white">
                  View Case Studies <span aria-hidden="true">→</span>
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