#!/usr/bin/env bash

# Install NVM if it doesn't exist
if command -v nvm &> /dev/null; then
    echo "nvm is installed 😀"
else
    echo "nvm (node version manager) is not installed, installing..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    echo "Adding nvm to the path"
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
fi

# Change nvm to use node 22
echo "Switching to node 22..."
nvm use 22

# Install npm dependencies
echo "Installing dependencies"
npm i &> /dev/null

# Open project in vscode
echo "Opening project in Visual Studio Code..."
code .

# Run the website
echo "Running the website using npm..."
npm run dev
