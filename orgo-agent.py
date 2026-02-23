"""
Orgo.ai + OpenClaw Launcher

This script creates an Orgo VM and installs OpenClaw on it programmatically.
Run this from your local machine (not from inside the Orgo VM).

Prerequisites:
  pip install orgo python-dotenv

Usage:
  1. Copy .env.example to .env and fill in ORGO_API_KEY
  2. python orgo-agent.py
"""

import os
from orgo import Computer
from dotenv import load_dotenv

load_dotenv()

INSTALL_SCRIPT = """
# Install Node 22 if needed
if ! command -v node &>/dev/null || [ "$(node -v | sed 's/v//' | cut -d. -f1)" -lt 22 ]; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

echo "OpenClaw installed. Run 'openclaw onboard' to complete setup."
"""


def main():
    print("Creating Orgo VM for OpenClaw...")

    computer = Computer(
        workspace="openclaw",
        name="openclaw-agent",
        ram=8,
        cpu=4,
    )

    try:
        # Install OpenClaw via bash
        print("Installing OpenClaw on the VM...")
        output = computer.bash(INSTALL_SCRIPT)
        print(output)

        # If you have an Anthropic key, set it up in the VM
        anthropic_key = os.getenv("ANTHROPIC_API_KEY")
        if anthropic_key:
            computer.bash(f"""
                mkdir -p ~/.openclaw
                echo 'ANTHROPIC_API_KEY={anthropic_key}' >> ~/.openclaw/.env
            """)
            print("Anthropic API key configured in VM.")

        print("\nOpenClaw is installed on your Orgo VM!")
        print("Next: Go to your Orgo dashboard to access the VM terminal")
        print("Then run: openclaw onboard")

    except Exception as e:
        print(f"Error: {e}")
        raise
    finally:
        # Don't destroy — keep the VM running so user can access it
        print(f"\nVM is running. View it at: https://www.orgo.ai/workspaces")


if __name__ == "__main__":
    main()
