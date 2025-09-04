const { db } = require('./src/config/database.ts');

async function addSampleData() {
  await db.connect();
  
  // Sample portfolio data
  const portfolioItems = [
    {
      title: 'E-commerce Analytics Dashboard',
      slug: 'ecommerce-analytics-dashboard',
      client: 'RetailTech Solutions',
      industry: 'E-commerce',
      description: 'Comprehensive analytics platform providing real-time insights into customer behavior, sales performance, and inventory optimization.',
      challenge: 'Client struggled with fragmented data sources and lacked real-time visibility into key business metrics across multiple sales channels.',
      solution: 'Implemented a unified data warehouse with automated ETL pipelines, created interactive dashboards using modern BI tools, and established real-time monitoring systems.',
      results: 'Achieved 35% increase in conversion rates, 50% reduction in inventory costs, and enabled data-driven decision making across all departments.',
      technologies: 'Python, Apache Spark, PostgreSQL, Tableau, AWS Redshift, Apache Airflow',
      status: 'published'
    },
    {
      title: 'Predictive Maintenance AI System',
      slug: 'predictive-maintenance-ai',
      client: 'Manufacturing Corp',
      industry: 'Manufacturing',
      description: 'Machine learning-powered predictive maintenance system that prevents equipment failures and optimizes maintenance schedules.',
      challenge: 'Frequent unexpected equipment breakdowns resulted in costly downtime and inefficient maintenance scheduling.',
      solution: 'Developed ML models using sensor data to predict equipment failures, implemented IoT data collection infrastructure, and created automated alerting systems.',
      results: 'Reduced unplanned downtime by 70%, decreased maintenance costs by 40%, and improved overall equipment effectiveness by 25%.',
      technologies: 'Python, TensorFlow, IoT Sensors, Azure ML, Time Series Analysis, Docker',
      status: 'published'
    },
    {
      title: 'Customer Segmentation & Personalization',
      slug: 'customer-segmentation-personalization',
      client: 'FinTech Innovations',
      industry: 'Financial Services',
      description: 'Advanced customer segmentation system enabling personalized product recommendations and targeted marketing campaigns.',
      challenge: 'Generic marketing approach resulted in low engagement rates and poor customer retention across diverse customer base.',
      solution: 'Built sophisticated clustering algorithms, implemented real-time recommendation engine, and developed automated personalization workflows.',
      results: 'Increased customer engagement by 60%, improved retention rates by 45%, and boosted revenue per customer by 30%.',
      technologies: 'Python, scikit-learn, Apache Kafka, Redis, MongoDB, React Dashboard',
      status: 'published'
    }
  ];

  // Sample blog posts
  const blogPosts = [
    {
      title: 'Why Data is the New Oil: Understanding the Strategic Value of Data Assets',
      slug: 'why-data-is-new-oil',
      excerpt: 'Explore how data has become the most valuable asset for modern businesses and why companies that effectively leverage data gain significant competitive advantages.',
      content: `In today's digital economy, data has emerged as the most valuable asset for businesses across all industries. Just as oil fueled the industrial revolution, data is now powering the digital transformation revolution.

Companies that understand how to collect, process, and analyze data effectively are gaining unprecedented competitive advantages. This comprehensive guide explores why data has become so crucial, how leading companies are leveraging it, and what steps your organization can take to unlock its data potential.

From improving customer experiences to optimizing operations and driving innovation, data-driven insights are reshaping how businesses operate and compete in the modern marketplace. Organizations that treat data as a strategic asset are consistently outperforming their competitors across key performance indicators.`,
      author: 'Brandenburg Data Consulting',
      status: 'published',
      tags: 'data strategy, business intelligence, digital transformation'
    },
    {
      title: 'The Evolution of Data-Driven Companies: From Reactive to Predictive',
      slug: 'evolution-data-driven-companies',
      excerpt: 'Discover how companies are evolving from reactive data usage to predictive analytics, enabling proactive decision-making and strategic planning.',
      content: `The journey from data collection to data-driven decision making represents one of the most significant business transformations of our time. Companies are no longer satisfied with simply collecting data and generating reports.

Instead, they are evolving into predictive organizations that can anticipate market trends, customer needs, and operational challenges before they occur. This evolution involves implementing advanced analytics, machine learning models, and real-time data processing capabilities.

Organizations that have successfully made this transition report dramatic improvements in efficiency, customer satisfaction, and revenue growth. This article examines the stages of data maturity and provides a roadmap for companies looking to advance their data capabilities.`,
      author: 'Brandenburg Data Consulting',
      status: 'published',
      tags: 'predictive analytics, data maturity, machine learning'
    },
    {
      title: 'Building a Data-First Culture: Strategies for Organizational Transformation',
      slug: 'building-data-first-culture',
      excerpt: 'Learn practical strategies for transforming your organization into a data-driven powerhouse where every decision is informed by actionable insights.',
      content: `Creating a data-first culture requires more than just implementing new technologies—it demands a fundamental shift in how organizations think about and use information.

Successful data transformation involves changing mindsets, establishing new processes, and empowering employees with the tools and knowledge they need to make data-driven decisions. This cultural shift enables companies to respond more quickly to market changes, identify new opportunities, and optimize their operations in ways that were previously impossible.

We explore the key components of a data-first culture, including executive leadership, employee training, technology infrastructure, and governance frameworks that ensure data quality and accessibility across the organization.`,
      author: 'Brandenburg Data Consulting',
      status: 'published',
      tags: 'data culture, organizational change, data governance'
    },
    {
      title: 'The ROI of Data: Measuring the Business Impact of Analytics Investments',
      slug: 'roi-of-data-analytics',
      excerpt: 'Understand how to measure and demonstrate the return on investment from data analytics initiatives and justify data strategy investments.',
      content: `One of the biggest challenges organizations face when investing in data analytics is demonstrating clear return on investment. While the benefits of data-driven decision making are well-documented, quantifying these benefits in financial terms can be complex.

This article provides frameworks for measuring the ROI of data initiatives, including direct cost savings, revenue improvements, risk reduction, and operational efficiency gains. We also explore case studies of companies that have successfully quantified their data investments, showing improvements ranging from 15-40% in key business metrics.

Understanding how to measure and communicate the value of data initiatives is crucial for securing ongoing investment and support for data programs.`,
      author: 'Brandenburg Data Consulting',
      status: 'published',
      tags: 'ROI, data investment, business metrics'
    }
  ];

  try {
    // Insert portfolio items
    for (const item of portfolioItems) {
      await db.run(`
        INSERT OR REPLACE INTO portfolio 
        (title, slug, client, industry, description, challenge, solution, results, technologies, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [item.title, item.slug, item.client, item.industry, item.description, item.challenge, item.solution, item.results, item.technologies, item.status]);
    }
    
    // Insert blog posts
    for (const post of blogPosts) {
      await db.run(`
        INSERT OR REPLACE INTO blog_posts 
        (title, slug, excerpt, content, author, status, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [post.title, post.slug, post.excerpt, post.content, post.author, post.status, post.tags]);
    }
    
    console.log('✅ Sample portfolio and blog data added successfully');
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
  
  process.exit(0);
}

addSampleData();