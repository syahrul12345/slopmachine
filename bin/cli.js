#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const command = process.argv[2];
const templateDir = path.join(__dirname, '..', 'template');

// --- Module definitions ---

const MODULES = {
  mobile:    { label: 'Mobile app (Expo + React Native)', group: 'product' },
  landing:   { label: 'Landing page (Next.js)', group: 'product' },
  crm:       { label: 'CRM (Supabase admin dashboard)', group: 'product' },
  auth:      { label: 'Auth (Apple + Google Sign-In)', group: 'feature' },
  payments:  { label: 'Payments (RevenueCat)', group: 'feature' },
  push:      { label: 'Push notifications', group: 'feature' },
  analytics: { label: 'Analytics', group: 'feature' },
};

// Auto-dependencies: if you pick X, you also get Y
const DEPENDENCIES = {
  crm:      ['landing', 'auth'],
  payments: ['mobile', 'auth'],
  push:     ['mobile'],
  auth:     [],
  mobile:   [],
  landing:  [],
  analytics: [],
};

// Module → files mapping
const MODULE_FILES = {
  mobile: {
    agents: ['mobile.md', 'designer.md'],
    workflows: ['build-and-ship.md'],
    libs: ['supabase.ts'],
    dirs: ['app', 'supabase'],
    templates: ['app.json.template', 'eas.json', 'babel.config.js'],
  },
  landing: {
    agents: ['landing.md'],
    workflows: [],
    libs: ['supabase.ts'],
    dirs: ['landing'],
    templates: [],
  },
  crm: {
    agents: ['crm.md'],
    workflows: ['crm-setup.md'],
    libs: [],
    dirs: [],
    templates: [],
  },
  auth: {
    agents: ['auth.md'],
    workflows: [],
    libs: ['auth.tsx', 'supabase.ts'],
    dirs: ['supabase'],
    templates: [],
  },
  payments: {
    agents: ['payments.md'],
    workflows: [],
    libs: ['purchases.ts'],
    dirs: [],
    templates: [],
  },
  push: {
    agents: ['push.md'],
    workflows: [],
    libs: ['notifications.ts'],
    dirs: ['supabase'],
    templates: [],
  },
  analytics: {
    agents: ['analytics.md'],
    workflows: [],
    libs: ['analytics.ts'],
    dirs: [],
    templates: [],
  },
};

// --- Helpers ---

function copyDir(src, dest, projectName, options = {}) {
  const { skipExisting = false } = options;
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;

    if (destName.endsWith('.template')) {
      destName = destName.replace('.template', '');
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, projectName, options);
    } else {
      if (skipExisting && fs.existsSync(destPath)) {
        continue;
      }
      let content = fs.readFileSync(srcPath, 'utf8');
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
      fs.writeFileSync(destPath, content);
    }
  }
}

function copyFile(src, dest, projectName, skipExisting = false) {
  if (skipExisting && fs.existsSync(dest)) return false;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let content = fs.readFileSync(src, 'utf8');
  content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
  fs.writeFileSync(dest, content);
  return true;
}

function resolveDependencies(selected) {
  const resolved = new Set(selected);
  let changed = true;
  while (changed) {
    changed = false;
    for (const mod of resolved) {
      for (const dep of (DEPENDENCIES[mod] || [])) {
        if (!resolved.has(dep)) {
          resolved.add(dep);
          changed = true;
        }
      }
    }
  }
  return resolved;
}

function generateClaudeMd(projectName, modules) {
  const lines = [];

  lines.push(`# ${projectName}`);
  lines.push('');
  lines.push('## Project');
  lines.push('<!-- Claude: fill this in as the project takes shape -->');
  lines.push('- App name: TBD');
  if (modules.has('mobile')) lines.push('- Bundle ID: TBD');
  lines.push('- Description: TBD');
  if (modules.has('mobile') || modules.has('auth') || modules.has('crm')) {
    lines.push('- Supabase project: TBD');
  }
  lines.push('');

  // Stack
  lines.push('## Stack');
  if (modules.has('mobile')) lines.push('- Mobile: Expo + React Native + TypeScript + Expo Router');
  if (modules.has('mobile') || modules.has('auth') || modules.has('crm')) {
    lines.push('- Backend: Supabase (Auth, DB, Storage, Edge Functions, Realtime)');
  }
  if (modules.has('landing') && modules.has('crm')) {
    lines.push('- Landing + CRM Admin: Next.js (in `landing/` directory)');
  } else if (modules.has('landing')) {
    lines.push('- Landing: Next.js (in `landing/` directory)');
  }
  if (modules.has('crm') && !modules.has('landing')) {
    lines.push('- CRM: Supabase + Next.js admin dashboard (`landing/app/admin/`)');
  }
  if (modules.has('payments')) lines.push('- Payments: RevenueCat');
  if (modules.has('analytics')) lines.push('- Analytics: TBD (configure in `lib/analytics.ts`)');
  lines.push('');

  // Active modules
  lines.push('## Active Modules');
  lines.push('<!-- These are the modules selected for this project. Claude should only load relevant agents. -->');
  for (const mod of modules) {
    lines.push(`- ${mod}`);
  }
  lines.push('');

  // Agent routing
  lines.push('## Agent Routing');
  lines.push('Load agent files based on your task:');
  lines.push('');
  if (modules.has('mobile')) lines.push('- **Mobile app development**: load `.claude/agents/mobile.md`');
  if (modules.has('landing')) lines.push('- **Landing page**: load `.claude/agents/landing.md`');
  if (modules.has('auth')) lines.push('- **Auth setup**: load `.claude/agents/auth.md`');
  if (modules.has('crm')) lines.push('- **CRM tasks**: load `.claude/agents/crm.md`');
  if (modules.has('payments')) lines.push('- **Payments setup**: load `.claude/agents/payments.md`');
  if (modules.has('push')) lines.push('- **Push notifications**: load `.claude/agents/push.md`');
  if (modules.has('analytics')) lines.push('- **Analytics setup**: load `.claude/agents/analytics.md`');
  if (modules.has('mobile')) lines.push('- **Design tasks**: load `.claude/agents/designer.md`');
  lines.push('- **Marketing tasks**: load `.claude/agents/marketing.md`');
  lines.push('- **Multi-step workflows**: see `.claude/workflows/`');
  lines.push('');

  // External dependencies
  lines.push('## External Dependencies');
  lines.push('<!-- CRITICAL RULE: When integrating ANY external API, SDK, or vendor service:');
  lines.push('1. Add an entry below (name, purpose, auth method)');
  lines.push('2. Create a context file at .claude/context/<vendor-name>.md with:');
  lines.push('   - Base URL / endpoints used');
  lines.push('   - Authentication method and required keys');
  lines.push('   - Request/response schemas for endpoints you call');
  lines.push('   - Rate limits or usage constraints');
  lines.push('3. This ensures all future Claude sessions have full context.');
  lines.push('   DO NOT skip this step. -->');
  lines.push('');
  lines.push('| Vendor | Purpose | Auth | Context File |');
  lines.push('|--------|---------|------|-------------|');
  if (modules.has('mobile') || modules.has('auth') || modules.has('crm')) {
    lines.push('| Supabase | Backend (DB, Auth, Storage) | Anon key + Service role key | built-in |');
  }
  if (modules.has('payments')) {
    lines.push('| RevenueCat | In-app purchases | API key per platform | `.claude/context/revenuecat.md` |');
  }
  lines.push('');

  // Credentials
  const creds = [];
  if (modules.has('auth')) {
    creds.push('- [ ] Apple Team ID');
    creds.push('- [ ] Apple Developer account email');
    creds.push('- [ ] Google Cloud OAuth Client IDs (iOS + Web)');
  }
  if (modules.has('payments')) {
    creds.push('- [ ] RevenueCat API keys (iOS + Android)');
  }
  if (modules.has('analytics')) {
    creds.push('- [ ] Analytics API key');
  }
  if (modules.has('mobile') || modules.has('auth') || modules.has('crm')) {
    creds.push('- [ ] Supabase project URL + keys (for production)');
  }
  if (creds.length > 0) {
    lines.push('## Required Credentials (ask developer early!)');
    lines.push(...creds);
    lines.push('');
  }

  // Conventions
  lines.push('## Conventions');
  lines.push('<!-- Updated as patterns emerge during development -->');
  if (modules.has('mobile')) {
    lines.push('- File-based routing via Expo Router in `app/`');
  }
  lines.push('- Shared utilities in `lib/`');
  if (modules.has('mobile') || modules.has('auth') || modules.has('crm')) {
    lines.push('- Supabase migrations in `supabase/migrations/` (use `supabase db diff -f <name>`)');
    lines.push('- Seed data in `supabase/seed.sql` — keep updated as schema evolves');
  }
  if (modules.has('mobile')) {
    lines.push('- Environment variables prefixed with `EXPO_PUBLIC_` for client access');
  }
  lines.push('- External API docs stored in `.claude/context/<vendor>.md`');

  return lines.join('\n');
}

// --- Prompt ---

async function promptModules() {
  const { default: inquirer } = await import('inquirer');

  console.log('');
  const { products } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'products',
    message: 'What are you building? (select all that apply)',
    choices: Object.entries(MODULES)
      .filter(([, v]) => v.group === 'product')
      .map(([k, v]) => ({ name: v.label, value: k })),
    validate: (ans) => ans.length > 0 ? true : 'Select at least one product.',
  }]);

  // Build feature choices based on product selection
  const featureChoices = [];
  featureChoices.push({ name: MODULES.auth.label, value: 'auth' });
  if (products.includes('mobile')) {
    featureChoices.push({ name: MODULES.payments.label, value: 'payments' });
    featureChoices.push({ name: MODULES.push.label, value: 'push' });
  }
  featureChoices.push({ name: MODULES.analytics.label, value: 'analytics' });

  const { features } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'features',
    message: 'What features do you need?',
    choices: featureChoices,
  }]);

  const selected = [...products, ...features];
  const resolved = resolveDependencies(selected);

  // Show auto-added modules
  const autoAdded = [...resolved].filter(m => !selected.includes(m));
  if (autoAdded.length > 0) {
    console.log(`  Auto-enabled: ${autoAdded.map(m => m).join(', ')} (required by dependencies)`);
  }

  return resolved;
}

// --- Copy module files ---

function copyModuleFiles(targetDir, projectName, modules, skipExisting = false) {
  // Collect all files needed
  const agents = new Set(['marketing.md']); // always included
  const workflows = new Set(['local-dev.md', 'marketing-launch.md']); // always included
  const libs = new Set();
  const dirs = new Set();

  for (const mod of modules) {
    const files = MODULE_FILES[mod];
    if (!files) continue;
    files.agents.forEach(f => agents.add(f));
    files.workflows.forEach(f => workflows.add(f));
    files.libs.forEach(f => libs.add(f));
    files.dirs.forEach(f => dirs.add(f));
  }

  // Copy agents
  const agentsDir = path.join(targetDir, '.claude', 'agents');
  fs.mkdirSync(agentsDir, { recursive: true });
  for (const file of agents) {
    const src = path.join(templateDir, '.claude', 'agents', file);
    if (fs.existsSync(src)) {
      copyFile(src, path.join(agentsDir, file), projectName, skipExisting);
    }
  }
  console.log(`  ✅ .claude/agents/ created (${[...agents].map(f => f.replace('.md', '')).join(', ')})`);

  // Copy workflows
  const workflowsDir = path.join(targetDir, '.claude', 'workflows');
  fs.mkdirSync(workflowsDir, { recursive: true });
  for (const file of workflows) {
    const src = path.join(templateDir, '.claude', 'workflows', file);
    if (fs.existsSync(src)) {
      copyFile(src, path.join(workflowsDir, file), projectName, skipExisting);
    }
  }
  console.log(`  ✅ .claude/workflows/ created (${[...workflows].map(f => f.replace('.md', '')).join(', ')})`);

  // Create context dir
  const contextDir = path.join(targetDir, '.claude', 'context');
  fs.mkdirSync(contextDir, { recursive: true });
  if (!fs.existsSync(path.join(contextDir, '.gitkeep'))) {
    fs.writeFileSync(path.join(contextDir, '.gitkeep'), '');
  }
  console.log('  ✅ .claude/context/ created');

  // Copy lib files
  if (libs.size > 0) {
    const libDir = path.join(targetDir, 'lib');
    fs.mkdirSync(libDir, { recursive: true });
    const copied = [];
    const skipped = [];
    for (const file of libs) {
      const src = path.join(templateDir, 'lib', file);
      if (fs.existsSync(src)) {
        if (copyFile(src, path.join(libDir, file), projectName, skipExisting)) {
          copied.push(file);
        } else {
          skipped.push(file);
        }
      }
    }
    if (copied.length) console.log(`  ✅ lib/ added: ${copied.join(', ')}`);
    if (skipped.length) console.log(`  ⏭  lib/ skipped (exist): ${skipped.join(', ')}`);
  }

  // Copy template directories
  for (const dir of dirs) {
    const src = path.join(templateDir, dir);
    const dest = path.join(targetDir, dir);
    if (fs.existsSync(src)) {
      if (skipExisting && fs.existsSync(dest)) {
        console.log(`  ⏭  ${dir}/ already exists — kept as-is`);
      } else {
        copyDir(src, dest, projectName, { skipExisting });
        console.log(`  ✅ ${dir}/ created`);
      }
    }
  }

  // Always create marketing directories
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

  return { agents, workflows, libs, dirs };
}

// --- Commands ---

async function main() {
  if (command === 'init') {
    await runInit();
  } else if (command && command !== '--help' && command !== '-h') {
    await runCreate(command);
  } else {
    printUsage();
  }
}

function printUsage() {
  console.log(`
Usage:
  slopmachine <project-name>    Create a new project from scratch
  slopmachine init              Add slopmachine Claude configs to an existing project

Examples:
  slopmachine my-app            Scaffold new project (interactive module selection)
  cd existing-app && slopmachine init   Add agents, workflows, CLAUDE.md to existing project
`);
  process.exit(0);
}

async function runInit() {
  const targetDir = process.cwd();
  const projectName = path.basename(targetDir);

  const hasPackageJson = fs.existsSync(path.join(targetDir, 'package.json'));
  const hasAppJson = fs.existsSync(path.join(targetDir, 'app.json'));

  if (!hasPackageJson && !hasAppJson) {
    console.error('Error: No package.json or app.json found. Are you in a project directory?');
    process.exit(1);
  }

  console.log(`\n🔧 Adding slopmachine configs to "${projectName}"...\n`);

  // Prompt for modules
  const modules = await promptModules();

  // Generate and write CLAUDE.md
  const claudeMdDest = path.join(targetDir, 'CLAUDE.md');
  if (fs.existsSync(claudeMdDest)) {
    console.log('  ⏭  CLAUDE.md already exists — skipping (you can merge manually)');
  } else {
    fs.writeFileSync(claudeMdDest, generateClaudeMd(projectName, modules));
    console.log('  ✅ CLAUDE.md created');
  }

  // Copy module files
  copyModuleFiles(targetDir, projectName, modules, true);

  // Copy .env.template if no .env.local exists
  const envLocalPath = path.join(targetDir, '.env.local');
  if (!fs.existsSync(envLocalPath)) {
    const envSrc = path.join(templateDir, '.env.template');
    if (fs.existsSync(envSrc)) {
      let content = fs.readFileSync(envSrc, 'utf8');
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
      fs.writeFileSync(envLocalPath, content);
      console.log('  ✅ .env.local created');
    }
  } else {
    console.log('  ⏭  .env.local already exists');
  }

  const moduleList = [...modules].join(', ');
  console.log(`
✅ slopmachine configs added to ${projectName}!
   Active modules: ${moduleList}

Next steps:
  1. Review CLAUDE.md and update the Project section
  2. Run \`claude\` and start building!
`);
}

async function runCreate(projectName) {
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

  // Prompt for modules
  const modules = await promptModules();

  // Create project directory
  fs.mkdirSync(targetDir, { recursive: true });

  // Copy base files (always needed)
  const baseFiles = ['tsconfig.json', '.gitignore'];
  for (const file of baseFiles) {
    const src = path.join(templateDir, file);
    if (fs.existsSync(src)) {
      copyFile(src, path.join(targetDir, file), projectName);
    }
  }

  // Copy package.json template if mobile, otherwise create a basic one
  if (modules.has('mobile')) {
    const pkgSrc = path.join(templateDir, 'package.json.template');
    if (fs.existsSync(pkgSrc)) {
      copyFile(pkgSrc, path.join(targetDir, 'package.json'), projectName);
    }
    // Copy mobile-specific templates
    for (const file of ['app.json.template', 'eas.json', 'babel.config.js']) {
      const src = path.join(templateDir, file);
      if (fs.existsSync(src)) {
        copyFile(src, path.join(targetDir, file.replace('.template', '')), projectName);
      }
    }
  } else {
    // Minimal package.json for non-mobile projects
    fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify({
      name: projectName,
      version: '1.0.0',
      private: true,
    }, null, 2));
  }

  // Generate CLAUDE.md
  fs.writeFileSync(path.join(targetDir, 'CLAUDE.md'), generateClaudeMd(projectName, modules));
  console.log('  ✅ CLAUDE.md generated');

  // Copy module-specific files
  copyModuleFiles(targetDir, projectName, modules);

  // Copy .env
  const envSrc = path.join(templateDir, '.env.template');
  if (fs.existsSync(envSrc)) {
    copyFile(envSrc, path.join(targetDir, '.env.local'), projectName);
    console.log('  ✅ .env.local created');
  }

  // Create assets directory
  const assetsDir = path.join(targetDir, 'assets');
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.writeFileSync(path.join(assetsDir, '.gitkeep'), '');

  console.log('\n📦 Installing dependencies...\n');
  try {
    execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
  } catch (e) {
    console.warn('\n⚠️  npm install failed. You can run it manually later.');
  }

  // Install landing page deps if landing module is active
  if (modules.has('landing')) {
    const landingDir = path.join(targetDir, 'landing');
    if (fs.existsSync(path.join(landingDir, 'package.json'))) {
      console.log('\n📦 Installing landing page dependencies...\n');
      try {
        execSync('npm install', { cwd: landingDir, stdio: 'inherit' });
      } catch (e) {
        console.warn('\n⚠️  Landing page npm install failed. You can run it manually later.');
      }
    }
  }

  // Initialize git
  console.log('\n🔧 Initializing git repository...\n');
  try {
    execSync('git init', { cwd: targetDir, stdio: 'inherit' });
    execSync('git add -A', { cwd: targetDir, stdio: 'inherit' });
    execSync('git commit -m "Initial scaffold from slopmachine"', { cwd: targetDir, stdio: 'inherit' });
  } catch (e) {
    console.warn('\n⚠️  Git init failed. You can initialize manually.');
  }

  const moduleList = [...modules].join(', ');
  console.log(`
✅ ${projectName} is ready!
   Active modules: ${moduleList}

Next steps:
  cd ${projectName}
${modules.has('mobile') || modules.has('auth') || modules.has('crm') ? `
  # Start local Supabase (requires Docker)
  supabase start
` : ''}${modules.has('mobile') ? `
  # Start the app
  npx expo start
` : ''}${modules.has('landing') ? `
  # Start the landing page
  cd landing && npm run dev
` : ''}
  # Open Claude and start building!
  claude

📋 Read CLAUDE.md for the full project setup guide.
`);
}

main().catch(console.error);
