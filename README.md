# Streamability 2! 🎬

🚧 Project currently under construction. Please check out version 1! 🚧

https://github.com/Thenlie/Streamability/tree/1.0.0-main

Streamability is a collaborative and responsive application made to display where an individual can stream their favorite TV shows and movies. When a user searches for their desired title, they'll be met with information about the title itself, what services stream the title, shows that are similar to the searched title, and a watch queue. Streamability is your one-stop-shop for planning your perfect movie night.

# Table of Contents

1. [Usage](#usage-🧑‍💻)
2. [Contributing](#contributing-👥)
3. [Git Workflow](#git-workflow-🧬)
4. [Branching Strategy](#branching-strategy-🌲)
5. [Questions](#questions)

## Usage 🧑‍💻

To run the development server, use the command:
```s
npm run dev
```

## Contributing 👥

Streamability is very open to contributions! If you have a feature request, or bug report, please open an [issue](https://github.com/Thenlie/Streamability/issues) with the applicable tag. If you would like to simply create a feature, [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) the repository and add in your changes. Then submit a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) which will be reviewed and eventually merged if it meets all contribution requirements. 

## Git Workflow 🧬

Streamability V2 is attempting to have a linear commit history on `main` as well as `develop`. You can read more about the benefits of linear commit histories [here](https://www.bitsnbites.eu/a-tidy-linear-git-history/#:~:text=A%20linear%20history%20is%20simply,branches%20with%20independent%20commit%20histories.). 

One common issue when learning to work with linear histories is avoiding merge commits. As an example, if you are on `feature` and another developer merges a pull request to `develop`, using the command `git merge develop` will create a merge commit on the feature branch log. Assuming the code added to develop is unrelated to the feature,this is an unnecessary commit on the feature branch. To avoid this, `git rebase develop` should be used instead.

## Branching Strategy 🌲

Creating and pushing a new feature branch is quite simple. Follow the steps below:

1. Checkout to `develop` and pull the most recent changes.
```s
git pull origin develop
```

2. Create a new feature branch using the proper naming convention.
```s
git checkout -b <"issue-num"-"issue-type"-"branch-name">
```
> NOTE: If you do not have an issue number or type, `NA-0`, should be used instead followed by the branch name.
> 
> The branch name is whatever the developer thinks fits best but should be descriptive, lowercase, and hyphen separated. 

3. Add your changes to the branch and create a new commit. The commit should contain a descriptive message of the changes or additions you have made. It is also a good idea to run an es-lint check first.
```s
npm run lint
git add -A
git commit -m "descriptive message"
```
> If develop gets new changes after you have made a commit, be sure to follow the process in Git Workflows to get those changes reflected in your branch.

4. Push your branch to the remote repository
```s
git push origin branch-name
```
> NOTE: This assumes you named the remote `origin`.

5. If you need to make changes to your code after the PR review, you can do so and add, then commit as normal. After you have done this use an interactive rebase to squash the commits into as few as possible. You will then need to force push your branch back to the remote.
```s
git rebase -i HEAD~2
...
git push -f origin branch-name
```
> NOTE: `HEAD~2` would pick the current HEAD and on commit previous for the rebase. Change this number as needed depending on the number of commits you have. You can read more about rebasing [here](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase).

## Code Quality 🧼

### ES Lint

In order to make it easier for lots of people to contribute to the project, we want to maintain a high standard of code. To help achieve this, [ES Lint](https://eslint.org/) has been set up in the project. It has also been added to an automation that will run on each PR. Your PR will be blocked if the lint check fails, so be sure not run lint check locally before pushing. To do this, use the commands below.

Run lint check, returns errors and warnings:
```s
npm run lint
```
Run lint check and fix any errors it can:
```s
npm run lint-fix
```

### TypeScript

The easiest way to check for typescript issues is to run the command `npm run watch`. This will run the TypeScript compiler in watch mode so errors and warning will automatically update on save. 

ES Lint will throw warnings for implicit use of the `any` type. This should be avoided whenever possible, but can also be ignored with an es-lint flag.

TypeScript also has a standardized comment syntax that should be followed for primary components/functions.

### Comments

Comments should generally not be left in the code. If they do need to exist, please use an environment flag. 
```
import.meta.env.DEV
```
> NOTE: Switch out `DEV` with `PROD` if you need something to only work in production

## Questions?

If you have any questions about the project, please open an issue with the label `tag: question`. One of the developers will try and get back to you within a few days!