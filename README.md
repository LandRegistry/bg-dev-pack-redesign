# Eleventy Dev Pack

## Automatic Dev Setup

This project will be automatically setup by running the `./go.sh` script.

## Manual Dev Setup

This project was built using node 22. You can install this using nvm.

To setup the workspace, and get started with dev do this:

1. Run `nvm use 22`
2. Run `npm i`
3. Open the project in vscode
4. Run `npx eleventy --serve`

Now when you navigate to `http://localhost:8080/` you'll see your changes reflected (so long as they don't cause the eleventy builder to fail)

## Pushing with dual remotes

When developing with a non-github remote, you can use the `./push-to-all.sh` script to push to both to ensure the non-github remote and github are both kept up-to-date with changes.

## Snippets

see [snippts.md](./snippets.md)