const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

// Ensure the images directory exists
const imagesDir = path.join(__dirname, '../public/images/services');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Service images configuration
const serviceImages = [
  {
    name: 'hardware-repair-bg',
    url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'web-dev-bg',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80'
  },
  {
    name: 'pos-systems-bg',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'saas-bg',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'ai-automation-bg',
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1986&q=80'
  }
];

async function downloadImage(url, filepath) {
  console.log(`Downloading ${url} to ${filepath}`);
  const response = await new Promise((resolve, reject) => {
    https.get(url, resolve).on('error', reject);
  });
  
  if (response.statusCode !== 200) {
    throw new Error(`Failed to download image: ${response.statusCode} ${response.statusMessage}`);
  }
  
  const file = fs.createWriteStream(filepath);
  await pipeline(response, file);
  console.log(`Downloaded ${filepath}`);
}

async function main() {
  try {
    console.log('Starting to download service background images...');
    
    for (const image of serviceImages) {
      const filepath = path.join(imagesDir, `${image.name}.jpg`);
      await downloadImage(image.url, filepath);
    }
    
    console.log('All service background images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading service images:', error);
    process.exit(1);
  }
}

main();
