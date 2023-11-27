# Interview Buddy 2.0

(NOTE : The Application is currently in Development)

Interview Buddy is an open source platform to help you land your next technical interview. Practice in an interview environment with simulated scenarios and real-time feedback. Build confidence and face interviews with a prepared and positive mindset, ready to shine.

## Tech Stack

- [Next.js](https://nextjs.org/)                 - Framework
- [tRPC](https://trpc.io/)                      - API
- [TypeScript](https://www.typescriptlang.org/)  - Language
- [Prisma](https://www.prisma.io/)               - ORM
- [NextAuth.js](https://next-auth.js.org/)       - Authentication
- [PostgreSql](https://www.postgresql.org/)      - Database
- [Recoil](https://recoiljs.org/)                - State Management
- [Tailwind](https://tailwindcss.com/)           - CSS
- [shadcn/ui](https://ui.shadcn.com/)            - Component Library

This repository uses [Turbo](https://turbo.build/repo) as the Monorepo.

## Development

### Docker Setup

The Docker Setup will be added soon !!! 

### Manual Setup

- Clone the repo to your local machine using the following command :

```
git clone https://github.com/VK-RED/Interview-Buddy-2.0.git
```
- Navigate to the project's root folder

```
cd Interview-Buddy-2.0
```
- Setup the env variables

```
cp .env.example .env
```
- Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the .env file.
- Use your own API keys for the following environment variables `GOOGLE_ID`, `GOOGLE_SECRET`, `DATABASE_URL`, `OPENAI_API_KEY` in the .env file
- Install all the dependencies in the root folder using the command

```
npm i
```

- Run the Prisma Migrations using the following command

```
npm run init-db
```

- Now run the Project using the command

```
npm run dev
```
- Now you can see your frontend being served at http://localhost:3000/

## What's inside

- The `apps` folder contains a next-app folder which is a `Next.js` app
- The `packages` contains dependencies/folders used by either `apps` (or) other packages.

    - The `packages/ai` contains the api for querying OpenAI.
    - The `packages/api` contains everything related to [tRPC](https://trpc.io/). Including procedures, middlewares and context.
    - The `packages/auth` contains the configurations of NextAuth for the app.
    - The `packages/db` contains Prisma and it's schema.
    - The `packages/eslint-config-custom` contains eslint configurations.
    - The `packages/tailwindconfig`contains tailwind configuration which is being used by `app` and the `ui` package.
    - The `packages/tsconfig` contains tailwind configurations which is being used by throughout the enire repo.
    - The `packages/ui` contains the shadcn/ui components. It is re-usable components and being styled using TailwindCSS.