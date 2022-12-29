# 🇳 🚀 😊  Next.js - Apollo GraphQL - Joy UI

Spend more time __building__ instead of _configuring_ your next project.

## 🚪 Intro

This is a slightly opinionated starter kit for developing [Next.js](https://nextjs.org/) apps. It uses the [Joy UI](https://mui.com/joy-ui/getting-started/overview/) library from [MUI](https://mui.com/) along with the [Apollo](https://www.apollographql.com/) stack. All [GraphQL](https://graphql.org/) are operations are fully typed with [GraphQL Codegen](https://the-guild.dev/graphql/codegen) and [Zeus](https://github.com/graphql-editor/graphql-zeus). The starter kit also includes a fully functional [authentication](https://next-auth.js.org/) system, [localization](https://www.i18next.com/), and outputs a [progressive web app](https://github.com/shadowwalker/next-pwa), plus plenty of other goodies for a great developer experience right out of the box.

> 👋 Hello there! Follow me [@linesofcodedev](https://twitter.com/linesofcodedev) or visit [linesofcode.dev](https://linesofcode.dev) for more cool projects like this one.

## 🏃‍ Get started

To get started clone the repo. Using `npx degit` is a great way to get this done quickly as it will remove the `.git` folder plus extra files like the `LICENSE.md` or this very `README.md` file.

```console
npx degit TimMikeladze/next-apollo-joy-starter my-app

cd my-app && git init

yarn && yarn dev
```

Once cloned just install all dependencies with `yarn` and you are ready to go. Happy coding!


> ❗ Important note: This project uses [yarn](https://yarnpkg.com/) for managing dependencies. If you want to use another package manager, remove the `yarn.lock` and control-f for usages of `yarn` in the project and replace them with your package manager of choice.

## 📦 What's included?

Remaining simple at its core, this project is packed with useful tools that enhance your experience while working with Next.js. Here is a list of the main features:

#### 💪 Starter code

- 🔒 [Next Auth](https://next-auth.js.org/) - A complete open source authentication solution for Next.js applications. It is designed from the ground up to support Next.js and Serverless.
- 🚀 [Apollo client and server](https://www.apollographql.com/) - Apollo is a great way to build your GraphQL stack. It comes with a great community and a lot of features out of the box such as caching, query batching, and more.
- 🤖 [Zeus](https://github.com/graphql-editor/graphql-zeus) + [GraphQL Codegen](https://the-guild.dev/graphql/codegen) - Type-safety anywhere GraphQL is used.
- 😊 [Joy UI](https://mui.com/joy-ui/getting-started/overview/) - Joy UI is a library of beautifully designed React UI components built to spark joy in the development process.
- 🌙 [Dark mode](https://mui.com/joy-ui/customization/dark-mode/) - Switch between light and dark mode with a single click.
- 🍞 [React Hot Toast](https://github.com/timolins/react-hot-toast) - The best toast in town. Smoking hot React notifications.
- 🌐 [i18next](https://www.i18next.com/) - The easiest way to translate your NextJs apps.
- 🔍 [Next SEO](https://github.com/garmeeh/next-seo) - The easiest way to add SEO support to your Next.js app.
- 📱 [Next PWA](https://github.com/shadowwalker/next-pwa) - Zero config PWA plugin for Next.js, with workbox.
- 🪵 [Axiom logging](https://axiom.co/) - Send structured logs directly from your code and query, stream, & analyze. [Learn more](https://axiom.co/docs/integrations/nextjs).

#### 🛠 Develop and test

- 📖 [Storybook](https://storybook.js.org/) - Build UI components and pages in isolation. It streamlines UI development, testing, and documentation.
- 🧪 [Jest](https://jestjs.io/) - A testing framework for JavaScript. Preconfigured to work with TypeScript and JSX.
- 🐙 [Run tests via Github Actions](https://docs.github.com/en/actions) - CI/CD workflows for your package. Run tests on every commit plus integrate with Github Releases to automate publishing package to NPM and Storybook to Github Pages.
- 📊 [Bundle analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - Visualize the size of Next.js output files with an interactive zoomable treemap.

##### 🧑‍🎨 Lint and format

- ☑️ [ESLint](https://eslint.org/) - A linter for JavaScript. Includes a simple configuration for React projects based on the recommended ESLint and AirBnB configs.
- 🎨 [Prettier](https://prettier.io/) - An opinionated code formatter.
- 🚫 [lint-staged](https://github.com/okonet/lint-staged) — Run linters on git staged files
- 🐶 [Husky](https://github.com/typicode/husky) — Running scripts before committing.

##### 📤 Commit and release

- 📝 [Commit-it](https://github.com/TimMikeladze/commit-it/) — A CLI tool to help you write stylish commit messages.
- 🔼 [Release-it](https://github.com/release-it/release-it/) - release-it is a command line tool to automatically generate a new GitHub Release and populates it with the changes (commits) made since the last release.
- 🏗️ [Renovate](https://github.com/renovatebot/renovate) - Universal dependency update tool that fits into your workflows. Configured to periodically check your dependencies for updates and send automated pull requests.

## 🎓 Usage

### 👷‍ Developing

Start the Next.js development server and watch GraphQL files for code generation.

```console
yarn dev
```

Working on the UI? Start Storybook to develop components in isolation.

```console
yarn storybook
```

### 🔬 Testing

Run tests when changes are detected.

```console
yarn test:watch
```

Or simply run all the tests

```console
yarn test
```

### 🚧 Building

Build the Next.js app for production.

```console
yarn build
```

### 📒 Committing

When you are ready to commit simply run the following command to get a well formatted commit message. All staged files will automatically be linted and fixed as well.

```console
yarn commit
```

### ✅ Releasing & tagging

Create a semantic version tag and publish to Github Releases. As part of this process a git tag will also be created on the current branch.

Learn more about how to use the `release-it` command [here](https://github.com/release-it/release-it).

```console
yarn release
```

### 📦 Deploying & building

This project can be deployed anywhere where Next.js is supported. I suggest using [Vercel](https://vercel.com) with the GitHub integration to quickly deploy an app to production.

If you want to build your app for production on your local machine, within a container, etc, simply run the following command:

```console
yarn build
```

### 🔎 Analyzing bundle size

To analyze the page bundles of your Next.js app, run the following command:

```console
yarn build:analyze
```

### 📱 Progressive Web App

This project is configured to be a PWA out of the box, it just needs a few more steps from you to be production ready. Add your image assets and define your manifest files. Start by following the [instructions here](https://github.com/shadowwalker/next-pwa#step-2-add-manifest-file-example).

### ⚙️ Customizing this starter

This project is designed to be a starting point for your project. Each of its features has a small footprint and can be easily removed or replaced with your own.

For example you easily replace Joy UI with Tailwind CSS with minimal effort while keeping the rest of the starter-kit intact.

## 🎊 Built a project with this starter kit?

That's awesome! Please feel free to open a PR and add your project to the list below.



