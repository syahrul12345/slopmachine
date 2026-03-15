#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const command = process.argv[2];
const templateDir = path.join(__dirname, '..', 'template');

// --- Helpers ---

function copyDir(src, dest, projectName, options = {}) {
  const { skipExisting = false, filter = null } = options;
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;

    // Apply filter if provided (relative path from template root)
    if (filter && !filter(srcPath)) continue;

    // Handle .template files — rename by stripping .template extension
    if (destName.endsWith('.template')) {
      destName = destName.replace('.template', '');
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, projectName, options);
    } else {
      if (skipExisting && fs.existsSync(destPath)) {
        console.log(`  ⏭  Skipping (exists): ${path.relative(process.cwd(), destPath)}`);
        continue;
      }
      let content = fs.readFileSync(srcPath, 'utf8');
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
      fs.writeFileSync(destPath, content);
    }
  }
}

// --- Commands ---

if (command === 'init') {
  // Init mode: inject Claude configs into existing project
  runInit();
} else if (command && command !== '--help' && command !== '-h') {
  // Create mode: scaffold a new project
  runCreate(command);
} else {
  printUsage();
}

function printUsage() {
  console.log(`
Usage:
  slopmachine <project-name>    Create a new project from scratch
  slopmachine init              Add slopmachine Claude configs to an existing project

Examples:
  slopmachine my-app            Scaffold new Expo + Supabase app
  cd existing-app && slopmachine init   Add agents, workflows, CLAUDE.md to existing project
`);
  process.exit(0);
}

function runInit() {
  const targetDir = process.cwd();
  const projectName = path.basename(targetDir);

  // Check we're in a real project (has package.json or app.json)
  const hasPackageJson = fs.existsSync(path.join(targetDir, 'package.json'));
  const hasAppJson = fs.existsSync(path.join(targetDir, 'app.json'));

  if (!hasPackageJson && !hasAppJson) {
    console.error('Error: No package.json or app.json found. Are you in a project directory?');
    process.exit(1);
  }

  console.log(`\n🔧 Adding slopmachine configs to "${projectName}"...\n`);

  // 1. Copy CLAUDE.md (skip if exists)
  const claudeMdSrc = path.join(templateDir, 'CLAUDE.md');
  const claudeMdDest = path.join(targetDir, 'CLAUDE.md');
  if (fs.existsSync(claudeMdDest)) {
    console.log('  ⏭  CLAUDE.md already exists — skipping (you can merge manually)');
  } else {
    let content = fs.readFileSync(claudeMdSrc, 'utf8');
    content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
    fs.writeFileSync(claudeMdDest, content);
    console.log('  ✅ CLAUDE.md created');
  }

  // 2. Copy .claude/ directory (agents, workflows, context)
  const claudeDirSrc = path.join(templateDir, '.claude');
  const claudeDirDest = path.join(targetDir, '.claude');
  copyDir(claudeDirSrc, claudeDirDest, projectName, { skipExisting: true });
  console.log('  ✅ .claude/agents/ created (developer, designer, marketing)');
  console.log('  ✅ .claude/workflows/ created (local-dev, build-and-ship, marketing-launch)');
  console.log('  ✅ .claude/context/ created (for external API docs)');

  // 3. Copy lib files that don't exist yet
  const libFiles = ['analytics.ts', 'purchases.ts', 'notifications.ts', 'supabase.ts', 'auth.tsx'];
  const libSrcDir = path.join(templateDir, 'lib');
  const libDestDir = path.join(targetDir, 'lib');
  let copiedLibs = [];
  let skippedLibs = [];

  fs.mkdirSync(libDestDir, { recursive: true });
  for (const file of libFiles) {
    const srcPath = path.join(libSrcDir, file);
    const destPath = path.join(libDestDir, file);
    if (fs.existsSync(destPath)) {
      skippedLibs.push(file);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
      fs.writeFileSync(destPath, content);
      copiedLibs.push(file);
    }
  }
  if (copiedLibs.length > 0) {
    console.log(`  ✅ lib/ added: ${copiedLibs.join(', ')}`);
  }
  if (skippedLibs.length > 0) {
    console.log(`  ⏭  lib/ skipped (exist): ${skippedLibs.join(', ')}`);
  }

  // 4. Create marketing directories
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
    const fullPath = path.join(targetDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      fs.writeFileSync(path.join(fullPath, '.gitkeep'), '');
    }
  }
  console.log('  ✅ marketing/ directories created');

  // 5. Copy .env.template if no .env.local exists
  const envLocalPath = path.join(targetDir, '.env.local');
  if (!fs.existsSync(envLocalPath)) {
    const envSrc = path.join(templateDir, '.env.template');
    let content = fs.readFileSync(envSrc, 'utf8');
    content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
    fs.writeFileSync(envLocalPath, content);
    console.log('  ✅ .env.local created with defaults');
  } else {
    console.log('  ⏭  .env.local already exists — skipping');
  }

  // 6. Ensure supabase dir exists
  const supabaseDir = path.join(targetDir, 'supabase');
  if (!fs.existsSync(supabaseDir)) {
    copyDir(path.join(templateDir, 'supabase'), supabaseDir, projectName);
    console.log('  ✅ supabase/ created (config, migrations, seed)');
  } else {
    // Just ensure seed.sql exists
    const seedPath = path.join(supabaseDir, 'seed.sql');
    if (!fs.existsSync(seedPath)) {
      fs.copyFileSync(path.join(templateDir, 'supabase', 'seed.sql'), seedPath);
      console.log('  ✅ supabase/seed.sql created');
    }
    console.log('  ⏭  supabase/ already exists — kept as-is');
  }

  console.log(`
✅ slopmachine configs added to ${projectName}!

What was added:
  CLAUDE.md              → Claude agent router (edit as your project evolves)
  .claude/agents/        → developer.md, designer.md, marketing.md
  .claude/workflows/     → local-dev.md, build-and-ship.md, marketing-launch.md
  .claude/context/       → Store external API docs here (auto-populated by Claude)
  lib/                   → analytics, purchases, notifications wrappers (if missing)
  marketing/             → Output directories for screenshots, videos, UGC

Next steps:
  1. Review CLAUDE.md and update the Project section
  2. Run \`claude\` and start building!
`);
}

function runCreate(projectName) {
  if (!/^[a-z0-9-_]+$/i.test(projectName)) {
    console.error('Error: Project name can only contain letters, numbers, hyphens, and underscores.');
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  console.log(`\n🚀 Creating ${projectName}...\n`);

  copyDir(templateDir, targetDir, projectName);

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
}
