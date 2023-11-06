# Supabase 💾

[Supabase](https://supabase.com/) is a Postgres database and database API used on the Streamability project. This is cloud based for production and run on in a docker container for local development. This document is intended to help developers setup and use the local supabase instance.

## Setup 🏗

### Pre-requisites

You will need to install [docker](https://www.docker.com/) on your machine to run the local Supabase server. Follow the installation instruction on the docker website for your specific OS.

Have the project set up with node modules installed. Refer to [getting started](getting-started.md) if necessary.

---

1. Ensure docker is running.

2. Populate the `.env` file.

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Both keys will be output by the command:

```sh
npm run db-start
```

To have the keys automatically written to you .env file, use the command:

```sh
npm run db-start-env
```

## Usage 🧑‍💻

To start the local Supabase instance, use the command:

```sh
npm run db-start
```

This will start the Supabse instace and launch the GUI on `localhost:54323`.

---

To stop the local Supabase instance, use the command:

```sh
npm run db-stop
```

## Other Documents 📄

[How To] [Delete the profile table](https://gist.github.com/Thenlie/164c28391075b3882de29f2bfc1d91bf)
