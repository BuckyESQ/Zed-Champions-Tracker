// File Path Case Sensitivity Checker
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

async function scanDirectory(dir) {
  console.log(`\n\x1b[1;34m==== Scanning directory: ${dir} ====\x1b[0m`);
  const entries = await readdir(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const stats = await stat(fullPath);
    
    if (stats.isDirectory()) {
      // Check directory name case
      if (entry !== entry.toLowerCase()) {
        console.log(`\x1b[1;31m⚠️  Directory with uppercase: ${fullPath} should be ${fullPath.toLowerCase()}\x1b[0m`);
      }
      
      // Recursively scan subdirectories
      await scanDirectory(fullPath);
    } else if (stats.isFile()) {
      // Check file name case
      if (entry !== entry.toLowerCase()) {
        console.log(`\x1b[1;31m⚠️  File with uppercase: ${fullPath} should be ${fullPath.toLowerCase()}\x1b[0m`);
      }
      
      // Check content for problematic paths if it's an HTML or JS file
      if (entry.endsWith('.html') || entry.endsWith('.js')) {
        await checkFileContent(fullPath);
      }
    }
  }
}

async function checkFileContent(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Look for "public" or "Public" in URLs and paths
    const publicPathRegex = /(["'])(\/[Pp]ublic\/[^"']*)(["'])/g;
    const matches = [...content.matchAll(publicPathRegex)];
    
    if (matches.length > 0) {
      console.log(`\x1b[1;33m📄 File: ${filePath} contains path references to check:\x1b[0m`);
      
      for (const match of matches) {
        const fullMatch = match[0];
        const path = match[2];
        
        if (path.includes('/Public/')) {
          console.log(`  \x1b[1;31m❌ Found uppercase Public: ${path}\x1b[0m`);
        } else {
          console.log(`  \x1b[1;32m✓ Path looks good: ${path}\x1b[0m`);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
  }
}

// Start scanning
console.log('\x1b[1;32m==== StableFields File Case Sensitivity Checker ====\x1b[0m');
console.log('Checking for uppercase directories, files, and problematic path references...');

(async () => {
  try {
    // Check deployment directory
    if (fs.existsSync('./stablefields-deploy')) {
      await scanDirectory('./stablefields-deploy');
    }
    
    // Check public directory
    if (fs.existsSync('./public')) {
      await scanDirectory('./public');
    }
    
    // Check root directory for key files
    const rootFiles = ['index.html', 'root-index.html'];
    for (const file of rootFiles) {
      if (fs.existsSync(`./${file}`)) {
        await checkFileContent(`./${file}`);
      }
    }
    
    console.log('\n\x1b[1;32m==== Case Sensitivity Check Complete ====\x1b[0m');
    console.log('Review any warnings above and fix case-sensitivity issues before uploading.');
  } catch (error) {
    console.error('Error during check:', error);
  }
})();
