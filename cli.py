#!/usr/bin/env python3
"""Simple CLI tool that outputs valid JSON."""

import json
import sys

def main():
    """Output basic status as JSON."""
    output = {
        "status": "success",
        "message": "CLI initialized successfully",
        "version": "1.0.0"
    }
    print(json.dumps(output, indent=2))

if __name__ == "__main__":
    main()
