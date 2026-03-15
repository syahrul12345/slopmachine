#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Usage: npx slopmachine <project-name>');
  console.error('Example: npx slopmachine my-app');
  process.exit(1);
}

if (!/^[a-z0-9-_]+$/i.test(projectName)) {
  console.error('Error: Project name can only contain letters, numbers, hyphens, and underscores.');
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  console.error(`Error: Directory "${projectName}" already exists.`);
  process.exit(1);
}

const templateDir = path.join(__dirname, '..', 'template');

console.log(`\n🚀 Creating ${projectName}...\n`);

// Recursively copy template directory
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;

    // Handle .template files — rename by stripping .template extension
    if (destName.endsWith('.template')) {
      destName = destName.replace('.template', '');
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      // Replace template variables
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
      fs.writeFileSync(destPath, content);
    }
  }
}

copyDir(templateDir, targetDir);

// Rename .env (was .env.template, stripped during copy) to .env.local
const envPath = path.join(targetDir, '.env');
const envLocalPath = path.join(targetDir, '.env.local');
if (fs.existsSync(envPath)) {
  fs.renameSync(envPath, envLocalPath);
}

// Create assets directory with placeholder
const assetsDir = path.join(targetDir, 'assets');
fs.mkdirSync(assetsDir, { recursive: true });
fs.writeFileSync(path.join(assetsDir, '.gitkeep'), '');

// Create marketing output directories
const marketingDirs = [
  'marketing/screenshots/iphone-6.7',
  'marketing/screenshots/iphone-6.5',
  'marketing/screenshots/iphone-5.5',
  'marketing/screenshots/ipad-12.9',
  'marketing/videos/raw',
  'marketing/ugc',
  'marketing/store-listing',
];
for (const dir of marketingDirs) {
  fs.mkdirSync(path.join(targetDir, dir), { recursive: true });
  fs.writeFileSync(path.join(targetDir, dir, '.gitkeep'), '');
}

console.log('📁 Project files created');

// Install dependencies
console.log('\n📦 Installing dependencies...\n');
try {
  execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
} catch (e) {
  console.warn('\n⚠️  npm install failed. You can run it manually later.');
}

// Install landing page dependencies
console.log('\n📦 Installing landing page dependencies...\n');
const landingDir = path.join(targetDir, 'landing');
try {
  execSync('npm install', { cwd: landingDir, stdio: 'inherit' });
} catch (e) {
  console.warn('\n⚠️  Landing page npm install failed. You can run it manually later.');
}

// Initialize git repo
console.log('\n🔧 Initializing git repository...\n');
try {
  execSync('git init', { cwd: targetDir, stdio: 'inherit' });
  execSync('git add -A', { cwd: targetDir, stdio: 'inherit' });
  execSync('git commit -m "Initial scaffold from slopmachine"', { cwd: targetDir, stdio: 'inherit' });
} catch (e) {
  console.warn('\n⚠️  Git init failed. You can initialize manually.');
}

console.log(`
✅ ${projectName} is ready!

Next steps:
  cd ${projectName}

  # Start local Supabase (requires Docker)
  supabase start

  # Start the app
  npx expo start

  # Start the landing page
  cd landing && npm run dev

  # Open Claude and start building!
  claude

📋 Read CLAUDE.md for the full project setup guide.
📖 Check .claude/workflows/local-dev.md for detailed local dev instructions.
`);
