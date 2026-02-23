# Plan: Check & Help with OpenClaw Installation on Orgo.ai

## Understanding the Situation

You were using **Claude on Chrome** to install **OpenClaw** (the open-source personal AI assistant) onto **Orgo.ai** (a cloud platform that provides virtual desktop environments for AI agents). Claude on Chrome created this `Open_Claw` GitHub repo, but it only scaffolded a Claude Code session hook — it never actually installed OpenClaw.

## What I Can and Cannot Do

### Cannot Do (limitations of this environment)
- **I cannot access your Orgo.ai account or dashboard.** Orgo.ai is a separate cloud platform at orgo.ai where you manage virtual machines. I have no credentials or access to it.
- **I cannot see or connect to any running Orgo VMs.** If you have a VM running on Orgo, I can't SSH into it or check its state.
- **I cannot check what Claude on Chrome did on the Orgo side.** That was a separate browser session.

### Can Do
- **I can help you set up this repo** with the correct OpenClaw configuration, scripts, and documentation so it's useful.
- **I can create an installation script** you can paste into your Orgo VM terminal to install OpenClaw properly.
- **I can help configure OpenClaw** (API keys, messaging channels, skills) once you share what you need.

## Proposed Steps

### Step 1: Create an Orgo VM setup script
Write a `setup-orgo.sh` script in this repo that you can copy-paste into an Orgo VM terminal. It will:
- Install OpenClaw via the official one-liner (`curl -fsSL https://openclaw.ai/install.sh | bash`)
- Set up a basic configuration scaffold (`~/.openclaw/openclaw.json`)
- Prompt for your API keys (Anthropic, etc.)

### Step 2: Add a README with instructions
Document the steps to:
1. Sign up / log in at orgo.ai
2. Create a new computer (8GB RAM recommended)
3. Open the VM terminal
4. Run the setup script from this repo
5. Run `openclaw onboard` to complete the wizard

### Step 3: Add OpenClaw config templates
Add template configuration files for:
- `openclaw.json` — gateway config with provider settings
- `.env.example` — environment variable template for API keys (ANTHROPIC_API_KEY, ORGO_API_KEY, etc.)

## What You Need to Do on Your Side
1. **Check your Orgo.ai dashboard** (log in at orgo.ai) to see if there's already a VM running with OpenClaw
2. **Gather your API keys** — at minimum you'll need an Anthropic API key for Claude
3. **Let me know** which messaging channels you want (Telegram, WhatsApp, Discord, etc.)
