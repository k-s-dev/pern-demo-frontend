# Nextjs/Reactjs PERN Trial

> **Postgresql** **Expressjs** **React** **Nodejs**
>
> A sample PERN stack project setup built with Nextjs app router and Typescript,
> deployed on Vercel
>
> This is a work in progress re implementation of [Nextjs demo monorepo](https://github.com/k-s-dev/nextjs-demo) 
> with separate backend instead of monolith architecture.

- _Frontend_ : **Nextjs**/**React** : [repo](https://github.com/k-s-dev/pern-demo-frontend) : [deployment](https://pern-demo-frontend.vercel.app/)
- _Backend_ : **Nodejs**/**Expressjs** : [repo](https://github.com/k-s-dev/pern-demo-backend) : [deployment](https://pern-demo-backend.vercel.app/)
  - _db_ : `postgresql`
    - _production_: hosted on **Neon**
    - _development & test_: local
    - _orm_ : **Prisma**

## Features

- Typescript and validation checks on backend and frontend
  - Frontend extends types and schemas from backend
- Auth: implemented using `better-auth`
  - sign in: email/password, OAuth
  - verification emails
  - sessions: cookie based token, verified on backend
  - authorization (permissions): custom role based checks
- Frontend
  - Nextjs 16: Cache components with SSR, SSG & pre-rendering
  - React 19: Server components
  - Forms: validation both on client and server
  - Nested table: custom nested table with infinite depth
- Multiple apps
  - Org
    - Tasks
    - Timer
    - Counter

## Workflow

### Pre build check list

#### Backend

- check env variables
  - `env_samples/` folder is available in git repo
  - if needed, create env samples: `npm run env:create:samples`

- setup db: [prisma docs](https://www.prisma.io/docs)
  - npm scripts for prisma cli commands are available
    - *prisma config file is at custom location, scripts need it specified manually*

- `npm run check`
  - runs all checks sequentially and stops at first error
    - `npm run check:format && npm run check:lint && npm run check:types`
  - rerun after resolving until all checks pass
  - format errors can be fixed by **prettier**
    - `npm run fix:format`
  - lint and typescript errors are better fixed manually

- run tests: **vitest**
  - `npm run test`

#### Frontend

- backend dependencies
  - sync with backend `npm run sync:backend`
    - definitions (types and validation schemas)
    - `README.md`
  - check backend server is running

- check env variables
  - `env_samples/` folder is available in git repo
  - if needed, create env samples: `npm run env:create:samples`

- `npm run check`
  - runs all checks sequentially and stops at first error
    - `npm run check:format && npm run check:lint && npm run check:types`
  - rerun after resolving until all checks pass
  - format errors can be fixed by **prettier**
    - `npm run fix:format`
  - lint and typescript errors are better fixed manually

- run tests
  - start backend server with configured environment for db
    - default: separate db for test environment
    - make sure `env.test` points to the right backend instance
  - component tests: **jest**
    - `npm run test:jest`
  - e2e tests: **cypress**
    - `npm run test`: build and start the server using test env
    - `npm run test:cypress:run` or `npm run test:cypress:open`
