# Open_Claw

Install and run [OpenClaw](https://openclaw.ai/) on [Orgo.ai](https://www.orgo.ai/) virtual desktops.

OpenClaw is an open-source personal AI assistant that connects to messaging platforms (Telegram, Discord, WhatsApp, etc.) and performs real actions. Orgo.ai provides cloud virtual desktops purpose-built for AI agents, so you can run OpenClaw without dedicating your own machine.

## Quick Start

### Option A: Manual install (paste into Orgo VM terminal)

1. **Create an Orgo VM** at [orgo.ai/workspaces](https://www.orgo.ai/workspaces) (free tier: 2 concurrent VMs, 100 hrs/month)
2. **Open the VM terminal** from the Orgo dashboard
3. **Run the installer:**

```bash
curl -fsSL https://raw.githubusercontent.com/AIbert69/Open_Claw/master/setup-orgo.sh | bash
```

4. **Complete onboarding:**

```bash
openclaw onboard
```

The wizard walks you through selecting an AI provider (Anthropic Claude recommended) and messaging channels.

### Option B: Programmatic install (from your local machine)

1. **Install the Orgo SDK:**

```bash
pip install -r requirements.txt
```

2. **Set your API keys:**

```bash
cp .env.example .env
# Edit .env with your ORGO_API_KEY and ANTHROPIC_API_KEY
```

3. **Launch:**

```bash
python orgo-agent.py
```

This creates an Orgo VM, installs OpenClaw on it, and configures your API key automatically.

## Files

| File | Purpose |
|------|---------|
| `setup-orgo.sh` | Bash installer to run inside an Orgo VM |
| `orgo-agent.py` | Python script to create an Orgo VM and install OpenClaw programmatically |
| `.env.example` | Template for API keys (Orgo, Anthropic, messaging channels) |
| `requirements.txt` | Python dependencies for `orgo-agent.py` |

## After Installation

```bash
openclaw doctor       # Check for config issues
openclaw status       # Show gateway status
openclaw dashboard    # Open the web dashboard
```

## API Keys You'll Need

| Key | Where to get it |
|-----|----------------|
| Orgo API key | [orgo.ai/workspaces](https://www.orgo.ai/workspaces) |
| Anthropic API key | [console.anthropic.com](https://console.anthropic.com/) |
| Telegram bot token | [@BotFather on Telegram](https://t.me/BotFather) |
| Discord bot token | [discord.com/developers](https://discord.com/developers/applications) |

## Resources

- [OpenClaw docs](https://docs.openclaw.ai/)
- [OpenClaw install guide](https://docs.openclaw.ai/install)
- [Orgo.ai docs](https://docs.orgo.ai/)
- [Orgo quickstart](https://docs.orgo.ai/quickstart)
