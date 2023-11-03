# Testing 🧪

Streamability uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/) for unit and UI testing to try and add some resilience to the code base. This document aims to help developers create, use, and debug those tests. The docs will be split into two parts, unit and UI.

### Unit Tests

Unit tests aim to test isolated pieces of code, removed from the rest of the repository. When we create a function that formats a string, does a math calculation, or manipulates an array, it would be a good candidate for a unit test.

### UI Tests

UI tests aim to test all the code working together in a functional application. We try to test what the actual rendered DOM looks like, and if it matches what we expect. When we create a new screen or component, it would be a good candidate for a UI test.

## Usage

Unit test live in `__tests__` directories within different modules. For example, `src/helpers/__tests__`. In general, we have one test file per code file. This makes it easy to know which test file is associated with each source code file. 

UI tests live in the `__tests__` directory in the base of `src`. All new UI test files should be kept within this directory, but new sub-directories can be created as needed.

To run the complete test suite:

```sh
npm test
```

To run an single test suite:

```sh
npm test src/helpers/__tests__/
```

To run an individual test file:

```sh
npm test src/helpers/__tests__/dateFormat.test.ts
```

To run the tests in watch mode so they re-run on save:
```sh
npm test -- -w
```

## Commits

The pre-commit hook will run the complete UI and Unit test suite. This ensures that new code being added to the repository is passing all checks. Frequently however, a develop would like to make a commit while tests are failing and fix them in a subsequent commit. This can be achieved in a number of ways.

You can use the `--no-verify` flag on your `git commit`. For example:

```sh
git commit -m "WIP -- working on tests [skip ci]" --no-verify
```

You can also set an environment flag in you shell to do this. Here is a helpful script for quickly creating WIP commits:

```sh
export NO_VERIFY=1 && git add -A && git commit -m "WIP -- [skip ci]" && export NO_VERIFY=
```

## Troubleshooting

When tests are failing, we should try and fix them. If a UI change was made, tests may just need to be updated to accommodate. If logic was changed, something could have broke and is being caught by the tests. 

If a test is failing and needs to be temporarily skipped for some reason, you can do so with `describe.skip` or `it.skip`. For example:

```ts
// Descriptive comment stating why the test is being skipped
describe.skip('failing test suite', () => {
    it.skip('failing test', () => {
        expect(1).toBe(2);
    });
});
```

Skip the minimal number of tests needed to get the suite passing. Do not skip the entire suite if only a single test is failing.

---

When running UI automation tests, failing tests will print out the React Testing Library DOM at time of failure. It is common for this to get truncated in out app. The size of this print can be expanded with the `DEBUG_PRINT_LIMIT` environment variable. For example:

```sh
DEBUG_PRINT_LIMIT=20000 npm test src/__tests__/screen/ExampleScreen.test.tsx
```