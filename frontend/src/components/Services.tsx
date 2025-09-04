import { 
  CircleStackIcon, 
  ChartBarIcon, 
  CpuChipIcon, 
  CloudIcon,
  CogIcon,
  PresentationChartLineIcon 
} from '@heroicons/react/24/outline'

const services = [
  {
    name: 'Data Modeling & Architecture',
    description: 'Design robust, scalable data models that serve as the foundation for your business intelligence and analytics initiatives.',
    features: ['Conceptual & Logical Data Models', 'Database Design & Optimization', 'Data Warehouse Architecture', 'Performance Tuning'],
    icon: CircleStackIcon,
  },
  {
    name: 'Data Transformation & ETL',
    description: 'Streamline your data pipelines with efficient extraction, transformation, and loading processes that ensure data quality.',
    features: ['ETL Pipeline Development', 'Data Quality Assurance', 'Real-time Data Processing', 'Migration Services'],
    icon: ChartBarIcon,
  },
  {
    name: 'Agentic AI Solutions',
    description: 'Implement cutting-edge AI agents that automate complex processes and provide intelligent insights for your business.',
    features: ['AI Agent Development', 'Process Automation', 'Natural Language Processing', 'Machine Learning Integration'],
    icon: CpuChipIcon,
  },
  {
    name: 'Cloud Data Solutions',
    description: 'Leverage cloud platforms to build scalable, cost-effective data infrastructure that grows with your business.',
    features: ['Cloud Migration', 'Multi-cloud Architecture', 'Data Lake Implementation', 'Serverless Analytics'],
    icon: CloudIcon,
  },
  {
    name: 'Business Intelligence',
    description: 'Transform raw data into actionable insights through comprehensive BI solutions and interactive dashboards.',
    features: ['Dashboard Development', 'Reporting Solutions', 'KPI Monitoring', 'Self-service Analytics'],
    icon: PresentationChartLineIcon,
  },
  {
    name: 'Data Strategy Consulting',
    description: 'Develop comprehensive data strategies aligned with your business objectives and industry best practices.',
    features: ['Data Governance', 'Strategic Planning', 'Technology Assessment', 'ROI Optimization'],
    icon: CogIcon,
  },
]

export default function Services() {
  return (
    <div className="py-20 sm:py-24 bg-white" id="services">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600 uppercase tracking-wide">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Complete Data Solutions
          </p>
          <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
            We deliver comprehensive data solutions designed to accelerate your digital transformation and drive sustainable business growth.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
            >
              <div className="flex flex-col">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 group-hover:bg-primary-700 transition-colors duration-300 mb-6">
                  <service.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-900 transition-colors mb-4">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 mr-3 flex-shrink-0">
                          <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <div className="bg-primary-900 rounded-2xl p-12">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Data?</h3>
            <p className="text-lg text-primary-200 mb-8 max-w-2xl mx-auto">
              Let's discuss how our expertise can accelerate your data initiatives and drive business growth.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-900 shadow-lg hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 group"
            >
              Start Your Project
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}