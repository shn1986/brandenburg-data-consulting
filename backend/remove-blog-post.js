const { db } = require('./src/config/database.ts');

async function removeBlogPost() {
  await db.connect();
  
  try {
    // Remove the third blog post "Building a Data-First Culture"
    await db.run(
      'DELETE FROM blog_posts WHERE slug = ?',
      ['building-data-first-culture']
    );
    
    console.log('✅ Third blog post "Building a Data-First Culture" removed successfully');
  } catch (error) {
    console.error('❌ Error removing blog post:', error);
  }
  
  process.exit(0);
}

removeBlogPost();