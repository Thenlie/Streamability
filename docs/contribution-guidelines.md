# Contributing 👥

Streamability is very open to contributions! If you have a feature request or bug report, please open an [issue](https://github.com/Thenlie/Streamability/issues) with the applicable tag. If you would like to create a feature yourself, [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) the repository and add in your changes. Then submit a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) which will be reviewed and eventually merged if it meets all contribution requirements.

---

## Branching Strategy 🌲

When creating branches, be sure to use the proper naming convention. Each item should by hyphen separated and lowercase.

1. Issue number. If no issue, `0`
2. Description.

Example:

```txt
123-update-readme
```

You should branch off of the `develop` branch, not `main` as this is where all PRs will point. Be sure your branch is up to date before submitting PRs by running `git rebase develop` while checked out to your branch.

---

## Code Quality 🧼

### ES Lint & Prettier

To make it easier for many people to contribute to the project, we want to maintain a high standard of code. To help achieve this, [ES Lint](https://eslint.org/) has been set up in the project. It has also been added to an automation that will run on each commit and PR. To run the lint checks manually, use the commands below. [Prettier](https://prettier.io/) is also being used as an ES Lint rule.

Run lint check, returns errors and warnings:

```sh
npm run lint
```

Run lint check and fix any errors it can:

```sh
npm run lint-fix
```

ES Lint will throw errors for the use of the `any` type. This should be avoided whenever possible, but can also be ignored with an es-lint-ignore comment when absolutely necessary.

Should you encounter an area where es-lint and prettier conflict, ignore prettier first.

If you notice that your editor makes changes that the commands above do not, only use the changes made by the commands. You may need to disable format-on-save if you local config conflicts with repositories.

### TypeScript

The easiest way to check for typescript issues is to run the command `npm run watch`. This will run the TypeScript compiler in watch mode so errors and warning will automatically update on save. If you would like to just run the compiler once, use `npm run compile`.

TypeScript also has a standardized comment syntax that should be followed for primary components/functions.

### Logs

Console logs may not be left in the code. If you need to log an error, or a debug log for some reason, you can use the [Logger](https://github.com/Thenlie/Streamability/blob/main/src/logger.ts) class. This will strip the logs from production builds. See the snippet below for an example of how to use the logger.

```ts
const LOG = new Logger('ScreenName');

LOG.error('my custom error message');
LOG.debug('my custom debug message');
```
