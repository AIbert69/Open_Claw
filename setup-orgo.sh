#!/bin/bash
set -euo pipefail

# ============================================================
# OpenClaw Installation Script for Orgo.ai Virtual Desktops
# ============================================================
# Run this script inside an Orgo VM terminal to install OpenClaw.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/AIbert69/Open_Claw/master/setup-orgo.sh | bash
#   -- or --
#   Copy-paste this script into your Orgo VM terminal.
# ============================================================

echo "==> OpenClaw installer for Orgo.ai"
echo ""

# 1. Check for Node.js 22+ (OpenClaw requirement)
if command -v node &>/dev/null; then
    NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
    if [ "$NODE_VERSION" -lt 22 ]; then
        echo "==> Node.js $NODE_VERSION found but OpenClaw requires Node 22+. Installing..."
        curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        echo "==> Node.js $(node -v) detected (OK)"
    fi
else
    echo "==> Node.js not found. Installing Node 22..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 2. Install pnpm if not present
if ! command -v pnpm &>/dev/null; then
    echo "==> Installing pnpm..."
    npm install -g pnpm
fi

# 3. Install OpenClaw via the official installer
echo ""
echo "==> Installing OpenClaw..."
echo "    This will download and run the official OpenClaw installer."
echo ""

# Use the official install script
curl -fsSL https://openclaw.ai/install.sh | bash

# 4. Verify installation
echo ""
if command -v openclaw &>/dev/null; then
    echo "==> OpenClaw installed successfully!"
    echo "    Version: $(openclaw --version 2>/dev/null || echo 'unknown')"
else
    echo "==> OpenClaw binary not found in PATH."
    echo "    You may need to restart your shell or add it to PATH."
    echo "    Try: source ~/.bashrc"
fi

# 5. Prompt user for next steps
echo ""
echo "============================================================"
echo "  NEXT STEPS"
echo "============================================================"
echo ""
echo "  1. Run the onboarding wizard:"
echo "     openclaw onboard"
echo ""
echo "  2. The wizard will guide you through:"
echo "     - Selecting an AI provider (Anthropic/Claude recommended)"
echo "     - Setting up messaging channels (Telegram, Discord, etc.)"
echo "     - Configuring skills and permissions"
echo ""
echo "  3. Useful commands:"
echo "     openclaw doctor    - Check for config issues"
echo "     openclaw status    - Show gateway status"
echo "     openclaw dashboard - Open the web dashboard"
echo ""
echo "  4. If you have an .env file with API keys, copy it to:"
echo "     ~/.openclaw/.env"
echo ""
echo "============================================================"
