# next-apollo-joy-starter

Spend more time __building__ instead of _configuring_ your nth project.

## Introduction

This is a slightly opinionated starter kit for developing Next.js apps. It uses the joy UI library from MUI along with the Apollo stack. All GraphQL are operations are fully typed with GraphQL Codegen and Zeus. The starter kit also includes a fully functional authentication system, localization, dark / light mode, and plenty of other goodies for a great developer experience right out of the box.

> 👋 Hello there! Follow me [@linesofcodedev](https://twitter.com/linesofcodedev) or visit [linesofcode.dev](https://linesofcode.dev) for more cool projects like this.

## Getting started

To get started clone the repo `npx degit` is a great way to do this as it will remove the `.git` folder plus extra files like the `LICENSE.md` or `FUNDING.yml`. Once cloned install all dependency with `yarn` and you are ready to go. Happy coding!

```console
npx degit TimMikeladze/next-apollo-joy-starter my-app

yarn && yarn dev
```

❗Important note: This project uses [yarn](https://yarnpkg.com/) for managing dependencies. If you want to use another package manager, remove the `yarn.lock` and control-f for usages of `yarn` in the project and replace them with your package manager of choice.

## What's included?

#### Starter code

- 🚀 [Next.Js]()
- 🚀 [Next Auth]()
- 🚀 [Apollo client and server]()
- 🚀 [GraphQL code generator]()
- 🚀 [Zeus GraphQL]()
- 🚀 [Joy UI]()
- 🚀 [Dark / Light mode toggle]()
- 🚀 [React Hot Toast]()

#### Develop and test

- 📖 [Storybook](https://storybook.js.org/) - Build UI components and pages in isolation. It streamlines UI development, testing, and documentation.
- 🧪 [Jest](https://jestjs.io/) - A testing framework for JavaScript. Preconfigured to work with TypeScript and JSX.
- 🐙 [Run tests via Github Actions](https://docs.github.com/en/actions) - CI/CD workflows for your package. Run tests on every commit plus integrate with Github Releases to automate publishing package to NPM and Storybook to Github Pages.

##### Lint and format

- ☑️ [ESLint](https://eslint.org/) - A linter for JavaScript. Includes a simple configuration for React projects based on the recommended ESLint and AirBnB configs.
- 🎨 [Prettier](https://prettier.io/) - An opinionated code formatter.
- 🚫 [lint-staged](https://github.com/okonet/lint-staged) — Run linters on git staged files
- 🐶 [Husky](https://github.com/typicode/husky) — Running scripts before committing.

##### Commit and publish

- 📄 [Commit-it](https://github.com/TimMikeladze/commit-it/) — A CLI tool to help you write stylish commit messages.
- 🔼 [Release-it](https://github.com/release-it/release-it/) - release-it is a command line tool to automatically generate a new GitHub Release and populates it with the changes (commits) made since the last release.
- 📚 [Deploy storybook via Github Actions](https://docs.github.com/en/actions) - CI/CD workflows for your package. Run tests on every commit plus integrate with Github Releases to automate publishing package to NPM and Storybook to Github Pages.
- 🏗️ [Renovate](https://github.com/renovatebot/renovate) - Universal dependency update tool that fits into your workflows. Configured to periodically check your dependencies for updates and send automated pull requests.

## Usage

### Developing

Start the Next.js development server and watch GraphQL files for code generation.

```console
yarn dev
```

Run tests with `jest` when changes are detected.

```console
yarn test:watch
```

Or simply run all the tests

```console
yarn test
```

### Building

Build the Next.js app for production.

```console
yarn build
```

### Testing

To run all tests once without watching for changes.

```console
yarn test
```

To watch for changes and run tests.

```
yarn test:watch
```

### Committing

When you are ready to commit simply run the following command to get a well formatted commit message. All staged files will automatically be linted and fixed as well.

```console
yarn commit
```

### Releasing & tagging

Create a semantic version tag and publish to Github Releases. When a new release is detected a Github Action will automatically publish your storybook to Github pages.

Learn more about how to use the `release-it` command [here](https://github.com/release-it/release-it).

```console
yarn release
```

### Deploying & building

This project can be deployed anywhere where Next.js is supported. I suggest using [Vercel](https://vercel.com) with the GitHub integration to quickly deploy an app to production.

If you want to build your app for production on your local machine, within a container, etc, simply run the following command:

```console
yarn build
```
