# Your SaaS starter

This is an official starter SaaS repository.

## Using this example

Run the following command:

```sh
git clone --depth 1 git@github.com:jeanmolossi/saas-first-steps.git my-saas-name
```

## What's inside?

This SaaS Starter repo includes the following packages/apps:

### Apps and Packages

-   `docs`: a [Next.js](https://nextjs.org/) app
-   `web`: another [Next.js](https://nextjs.org/) app
-   `@repo/ui`: a [shadcn/ui](https://ui.shadcn.com/docs) based React component library shared by both `web` and `docs` applications
-   `@repo/ts-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Saas starter repo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [TailwindCSS](https://tailwindcss.com/) for HTML styling
-   [Shadcn/ui](https://ui.shadcn.com/docs) for React components building
-   [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-saas-name
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-saas-name
pnpm dev
```
