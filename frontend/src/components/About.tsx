import { CheckCircleIcon } from '@heroicons/react/24/solid'

const values = [
  {
    name: 'Data-Driven Excellence',
    description: 'Every decision backed by comprehensive analysis and proven methodologies.',
  },
  {
    name: 'Innovation Focus',
    description: 'Leveraging cutting-edge technologies and emerging trends in data science.',
  },
  {
    name: 'Client-Centric Approach',
    description: 'Tailored solutions that align with your specific business objectives.',
  },
  {
    name: 'Scalable Solutions',
    description: 'Future-proof architectures that grow with your organization.',
  },
]

const expertise = [
  'Advanced Analytics & Modeling',
  'Cloud Data Platforms (AWS, Azure, GCP)',
  'Machine Learning & AI Implementation',
  'Real-time Data Processing',
  'Data Governance & Compliance',
  'Business Intelligence & Visualization',
]

export default function About() {
  return (
    <div className="py-20 sm:py-24 bg-gray-50" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
          <div className="lg:pr-8">
            <div className="relative">
              <h2 className="text-base font-semibold leading-7 text-primary-600 uppercase tracking-wide">About Us</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Your Strategic Data Partner
              </p>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                Brandenburg Data Consulting empowers organizations to harness the transformative power of data through innovative solutions and strategic expertise.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We combine deep technical knowledge with industry best practices to deliver solutions that not only meet your current needs but also scale with your future ambitions.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Core Expertise</h3>
              <div className="grid grid-cols-1 gap-4">
                {expertise.map((skill) => (
                  <div key={skill} className="flex items-center py-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 mr-4 flex-shrink-0">
                      <CheckCircleIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-800 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Values</h3>
              <div className="space-y-8">
                {values.map((value, index) => (
                  <div key={value.name} className="relative">
                    <div className="flex items-start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-sm mr-4 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{value.name}</h4>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Data?</h3>
                <p className="text-primary-100 mb-8 text-lg">
                  Let's discuss how we can turn your data challenges into strategic opportunities.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-900 shadow-lg hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 group"
                >
                  Schedule Your Consultation
                  <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}