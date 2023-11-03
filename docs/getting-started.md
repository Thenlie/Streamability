# Project Set Up 🏗️

The steps below contain everything a first time developer needs to get the Streamability project running locally.

## Pre-requisites

- Docker Desktop
- Node v18
- Git

Node is the JavaScript runtime engine used on the Streamability project. Currently the project is set up to run on Node 18.18.2. It should also work on Node 20 but not yet officially supported. You can download Node 18 from [this link](https://nodejs.org/download/release/v18.18.2/). If you already are using a different version you can try to run the project. In most cases it will run without issue. If you do have a problem, you can use a version manager like [asdf](https://asdf-vm.com/) or [nvm](https://github.com/nvm-sh/nvm) to install a different version of Node.

You will need to install [docker](https://www.docker.com/) on your machine to run the local Supabase server. Follow the installation instruction on the docker website for your specific OS.

Git is the version control system used on the Streamability project. You can download the latest version from [this link](https://git-scm.com/downloads).

## Forking

> If you would prefer to follow the official GitHub documentation on forking, you can find them [here](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository). This is a slightly abridged version of those instructions.

1. Navigate to the [develop](https://github.com/Thenlie/Streamability/tree/develop) branch of the repository on GitHub and click the "Fork" button on the top right corner of the page.

- Under "Owner," select the dropdown menu and click an owner for the forked repository.

- By default the fork will be named "Streamability". Optionally, to further distinguish your fork, in the "Repository name" field, type a name.

- Optionally, in the "Description" field, type a description of your fork.

- Do not select "Copy the DEFAULT branch only" as you will need `develop` and the default branch is `main`.

2. Click Create fork.

3. Navigate to the forked repository and click on the green "Code" button.

4. Copy the repository URL with the method of your choosing. We suggest SSH which can be setup by following [these docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

5. Go to your terminal program of choice and navigate the the folder you want the project to live in. Then run the command below to clone the repository:

```sh
git clone repository-url
```

## Dependency Installation

1. In your terminal, navigate to the project directory with the command:

```sh
cd path-to-project
```

2. Once you are in the project directory you need to install node modules with the command:

```sh
npm install
```

6. To ensure git-hooks run during commits, you need to run the set up command:

```sh
npm run setup
```

## Environment Variables

You will need to fill out the `.env` file with 3 variables. Use the `.env.template` as a guide.

`VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` are for Supabase.

1. Ensure docker is running.

2. These keys will be output by the command:

```sh
npm run db-start
```

To have the keys automatically written to you .env file, use the command:

```sh
npm run db-start-env
```

> Note: For remote develop or production keys, you will need to reach out to a codeowner. In general, these should not be needed.

`VITE_MOVIEDB_KEY` comes from The Movie Database. 

1. Navigate to [https://www.themoviedb.org/](https://www.themoviedb.org/) and create a free account. 

2. Navigate to your profile settings and click on "API". There you will see your API key or a button to generate one.

## Running

You should now have everything set up and be able to run the application. To do so, use the command:

```sh
npm run dev
```

To run the [storybook](storybook.md) application, use the command:

```sh
npm run storybook
```

If you have stopped the database since setting up environment variables, ensure docker is running and then run the command:

```sh
npm run db-start
```