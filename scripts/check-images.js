#!/usr/bin/env node

/**
 * Image Structure Checker for Devmali Heritage Website
 * This script helps validate that all required images are present
 * and provides a checklist for missing images.
 */

const fs = require('fs');
const path = require('path');

// Define all expected image paths based on the codebase
const expectedImages = {
  // Virtual Darshan Images
  'darshan': [
    'main-deity-hd.jpg',
    'main-deity-thumb.jpg',
    'sanctum-hd.jpg',
    'sanctum-thumb.jpg',
    'entrance-hd.jpg',
    'entrance-thumb.jpg',
    'prayer-hall-hd.jpg',
    'prayer-hall-thumb.jpg',
    'decorations-hd.jpg',
    'decorations-thumb.jpg',
    'aarti-hd.jpg',
    'aarti-thumb.jpg'
  ],
  
  // Heritage Images
  'heritage': [
    'mud-house-traditional.jpg',
    'devnarayan-festival.jpg',
    'village-daily-life.jpg',
    'temple-architecture.jpg',
    'traditional-crafts.jpg',
    'community-gathering.jpg',
    'historical-timeline.jpg',
    'mud-house-detail.jpg',
    'community-traditions.jpg',
    'village-legends.jpg',
    'historical-artifacts.jpg',
    'temple-construction-history.jpg'
  ],
  
  // Architecture Images
  'architecture': [
    'mud-house-exterior.jpg',
    'mud-house-interior.jpg',
    'construction-process.jpg',
    'temple-details.jpg'
  ],
  
  // Traditions Images
  'traditions': [
    'community-gathering.jpg',
    'vegetarian-cooking.jpg',
    'festival-celebration.jpg',
    'daily-prayers.jpg'
  ],
  
  // Testimonial Images
  'testimonials': [
    'priya.jpg',
    'james.jpg',
    'rajesh.jpg'
  ],
  
  // 360-degree Images
  '360': [
    'main-temple-360.jpg'
  ]
};

// Root level images
const rootImages = [
  'heritage-bg.jpg',
  'spiritual-bg.jpg',
  'tourism-bg.jpg',
  'village-landscape.jpg',
  'devmali-hero-bg.jpg',
  'placeholder-temple.jpg'
];

// Audio files
const expectedAudio = {
  'spiritual': [
    'daily-prayers.mp3',
    'devnarayan-teachings.mp3',
    'sacred-mantras.mp3',
    'sacred-stories.mp3'
  ],
  'ambiance': [
    'temple-bells.mp3',
    'om-chanting.mp3',
    'divine-flute.mp3',
    'aravalli-nature.mp3'
  ],
  'tours': [
    'main-temple-en.mp3'
  ]
};

// Video files
const expectedVideos = [
  'devmali-village.mp4'
];

// Download files
const expectedDownloads = [
  'complete-prayer-book.pdf',
  'festival-calendar-2024.pdf',
  'devnarayan-teachings.pdf',
  'sacred-mantras-collection.zip',
  'village-stories.pdf',
  'daily-prayers.pdf',
  'sacred-stories.pdf'
];

function checkDirectory(basePath, files, category) {
  const results = {
    found: [],
    missing: [],
    extra: []
  };
  
  // Check if directory exists
  if (!fs.existsSync(basePath)) {
    console.log(`❌ Directory missing: ${basePath}`);
    results.missing = files;
    return results;
  }
  
  // Get actual files in directory
  const actualFiles = fs.readdirSync(basePath).filter(file => 
    !file.startsWith('.') && file !== 'README.md'
  );
  
  // Check for expected files
  files.forEach(file => {
    if (actualFiles.includes(file)) {
      results.found.push(file);
    } else {
      results.missing.push(file);
    }
  });
  
  // Check for extra files
  actualFiles.forEach(file => {
    if (!files.includes(file)) {
      results.extra.push(file);
    }
  });
  
  return results;
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileInfo(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return {
      exists: true,
      size: stats.size,
      formattedSize: formatFileSize(stats.size)
    };
  } catch (error) {
    return {
      exists: false,
      size: 0,
      formattedSize: '0 Bytes'
    };
  }
}

function main() {
  console.log('🖼️  Devmali Heritage Website - Image Structure Checker');
  console.log('=' .repeat(60));
  
  const publicPath = path.join(process.cwd(), 'public');
  const imagesPath = path.join(publicPath, 'images');
  
  let totalMissing = 0;
  let totalFound = 0;
  
  // Check image directories
  console.log('\n📁 Checking Image Directories:');
  Object.entries(expectedImages).forEach(([category, files]) => {
    const categoryPath = path.join(imagesPath, category);
    const results = checkDirectory(categoryPath, files, category);
    
    console.log(`\n  ${category.toUpperCase()}:`);
    console.log(`    ✅ Found: ${results.found.length}`);
    console.log(`    ❌ Missing: ${results.missing.length}`);
    if (results.extra.length > 0) {
      console.log(`    ➕ Extra: ${results.extra.length}`);
    }
    
    if (results.missing.length > 0) {
      console.log(`    Missing files:`);
      results.missing.forEach(file => {
        console.log(`      - ${file}`);
      });
    }
    
    totalFound += results.found.length;
    totalMissing += results.missing.length;
  });
  
  // Check root level images
  console.log('\n  ROOT IMAGES:');
  const rootResults = checkDirectory(imagesPath, rootImages, 'root');
  console.log(`    ✅ Found: ${rootResults.found.length}`);
  console.log(`    ❌ Missing: ${rootResults.missing.length}`);
  
  if (rootResults.missing.length > 0) {
    console.log(`    Missing files:`);
    rootResults.missing.forEach(file => {
      console.log(`      - ${file}`);
    });
  }
  
  totalFound += rootResults.found.length;
  totalMissing += rootResults.missing.length;
  
  // Check audio files
  console.log('\n🎵 Checking Audio Files:');
  const audioPath = path.join(publicPath, 'audio');
  Object.entries(expectedAudio).forEach(([category, files]) => {
    const categoryPath = path.join(audioPath, category);
    const results = checkDirectory(categoryPath, files, category);
    
    console.log(`\n  ${category.toUpperCase()}:`);
    console.log(`    ✅ Found: ${results.found.length}`);
    console.log(`    ❌ Missing: ${results.missing.length}`);
    
    if (results.missing.length > 0) {
      console.log(`    Missing files:`);
      results.missing.forEach(file => {
        console.log(`      - ${file}`);
      });
    }
  });
  
  // Check video files
  console.log('\n🎥 Checking Video Files:');
  const videoPath = path.join(publicPath, 'videos');
  const videoResults = checkDirectory(videoPath, expectedVideos, 'videos');
  console.log(`    ✅ Found: ${videoResults.found.length}`);
  console.log(`    ❌ Missing: ${videoResults.missing.length}`);
  
  // Check download files
  console.log('\n📄 Checking Download Files:');
  const downloadPath = path.join(publicPath, 'downloads');
  const downloadResults = checkDirectory(downloadPath, expectedDownloads, 'downloads');
  console.log(`    ✅ Found: ${downloadResults.found.length}`);
  console.log(`    ❌ Missing: ${downloadResults.missing.length}`);
  
  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 SUMMARY:');
  console.log(`✅ Total Images Found: ${totalFound}`);
  console.log(`❌ Total Images Missing: ${totalMissing}`);
  
  const completionPercentage = totalFound + totalMissing > 0 
    ? Math.round((totalFound / (totalFound + totalMissing)) * 100) 
    : 0;
  
  console.log(`📈 Completion: ${completionPercentage}%`);
  
  if (totalMissing === 0) {
    console.log('\n🎉 All required images are present!');
  } else {
    console.log(`\n⚠️  ${totalMissing} images still need to be added.`);
    console.log('📖 See public/images/README.md for detailed specifications.');
  }
  
  console.log('\n💡 Tips:');
  console.log('  - Use high-quality, culturally appropriate images');
  console.log('  - Optimize images for web (compress before uploading)');
  console.log('  - Ensure proper permissions for all images used');
  console.log('  - Follow the naming conventions in README.md');
}

if (require.main === module) {
  main();
}

module.exports = { checkDirectory, getFileInfo };