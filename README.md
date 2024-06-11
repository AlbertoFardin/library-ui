<!-- markdownlint-disable -->

<p align="center">
<img width="450" src="./static/logo.svg" alt="Alberto Fardin">
</p>

This is my personal web site and portfolio online.

This is a customizable library of components to build faster and more accessible applications.

Follow design system of [Material Design](https://material.io/design/introduction/).

Build with [ReactJs](https://reactjs.org/) and [Npm](https://www.npmjs.com/)

---

# Prerequisites

You must have Node Verision Manager (versione 0.39.5) and you have to use it to install NodeJs (version 16.20.2)
Installing NodeJs will also install npm (version 8.19.4)

> Before updating the NodeJS version, backward compatibility with the libraries used and the code must be checked
> So you will have to align the version in Jenkins too
> maximum memory allowed for Node.js must be 4GB or upper.

## Node Version Manager

### Install

Follow the instructions you find in https://github.com/nvm-sh/nvm

### Check version

```bash
 nvm -v
```

## NodeJs and Npm

### Install

To install NodeJs to specific version using Node Version Manager you must run command

```bash
nvm install 16.20.2
```

### Check version

```bash
 node -v
 npm -v
```

## Maximum memory allowed for Node.js

### set max-old-space-size nodeJS option

Add `max-old-space-size` nodeJS option to 4096 or upper.

```
export NODE_OPTIONS="--max-old-space-size=4096"
```

### check

Command

```bash
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
```

must return 4144 or upper

## Install all dependencies

Install dependencies using the command

```bash
npm ci
```

> if you want reinstall all, run before the command 'rm -rf node_modules'

## Enable husky

Enable husky to perform actions on git commits

```bash
npx husky-init
npm run prepare
```

and add file `.huskyrc` in home directory with content

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

---

# IDE

The IDE of the frontend development team is [Visual Studio Code](https://code.visualstudio.com/).

## Visual Studio Code

After downloading and installing [VSCODE](https://code.visualstudio.com/Download)

1. make the code command from Visual Studio Code available as a Bash command

- Open Visual Studio Code.
- Go to the "View" menu and select "Command Palette"
- Type "Shell Command: Install 'code' command in PATH" and press Enter.

2. run the command to install the plugins

```bash
cat vscodeplugin.txt | xargs -n 1 code --install-extension
```

Note: to update this file after extension installation

```bash
code --list-extensions > vscodeplugin.txt
```

The folder `.vscode` contains VSCode preferences.
ESLint has been set to format the code on save.
See [linting and formatting with eslint in Visual Studio Code](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code)

---

# Check & format code

To verify the code you need to run the command

```bash
npm run check
```

This command is equivalent to run ESLint check and JEST check, and so it check code and run all component's Unit Test.

> `preversion` is an alias of `check`

To run only ESLint check the command is

```bash
npm run check:eslint
```

To update EsLint you must run

```bash
npm i eslint@latest @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest --save
```

> To have code robust, easy to read and easy to maintain, each complex functionality, or component, must be divided into
> micro parts and for each one create an descrived unit test with [Jest](https://jestjs.io/).

To run only JEST check the command is

```bash
npm run check:jest
```

Tests are written in a folder `__tests__` in the same root where the function/component to test are.

> You can run a single test using the `debugger tool` of your IDE (VSCode...).

To format all files in source you can run

```bash
npm run fmt
```

To format any formattable file you must execute the command

```bash
npx prettier . --write
```

> the `.prettierignore` file contains information to tell prettier to ignore files or folders.

---

# Storybook

Storybook is a frontend workshop for building UI components and pages in isolation.

To build static version of storybook the command is

```bash
npm run storybook:build-static
```

To start storybook locally

```bash
npm run dev
```

> `dev` is an alias of `storybook:start`

Open `http://localhost:9001` in browser.
Use this mode for development

---

# Commit to repository

Each commit message must have a body message contained the issue code and a clear, synthetic and relative text to what modified is about. Messages like "fix" or "changed" without specifying the subject will not be accepted.

Example: `SEECOMM-2704: Toolbar manage new prop "onClick"`

if pre commit hook blocks the commit, and you want to fight without solving the error you can use `--no-verify` option.

```bash
  git commit --no-verify -m "Commit message"
```

---

# Versioning and release

This repo follows the rules of [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) and [SemVer](http://semver.org/).
