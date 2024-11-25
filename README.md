# db-testing

## Overview

This repository contains a test suite of "slow" tests to demonstrate how parallel tests can
increase speed of test runs.

There are two Jest configurations provided to show the tests running sequentially and in parallel.

Blog post: [here](https://danieltea.com//writing/speeding-up-integration-tests)

### Technology Stack

- **Docker Compose**: For running PostgreSQL.
- **Kysely**: SQL query builder with TypeScript support.
- **Jest**: Testing framework.
- **ts-jest**: TypeScript support for Jest.

## How to Run the Tests

### Prerequisites

1. Clone the repository.
2. Start up PostgreSQL via Docker: `docker-compose up -d`.
3. Install dependencies: `npm install`.
4. Run migrations: `npm run migrate:latest`.

### Running the Tests

- **Sequential Testing**: Runs the tests one after another.
  ```sh
  npm run test:sequential
  ```

- **Parallel Testing**: Runs the tests concurrently.
  ```sh
  npm run test:parallel
  ```

### Example Output

#### Sequential Testing

```sh
➜ npm run test:sequential

> db-testing@1.0.0 test:sequential
> jest --projects test/sequential.config.cjs --runInBand

 PASS   sequential  src/create-user-5.test.ts
 PASS   sequential  src/create-user-2.test.ts
 PASS   sequential  src/create-user-3.test.ts
 PASS   sequential  src/create-user-1.test.ts
 PASS   sequential  src/create-user-4.test.ts

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        5.871 s, estimated 6 s
Ran all test suites.
```

#### Parallel Testing

```sh
➜ npm run test:parallel

> db-testing@1.0.0 test:parallel
> jest --projects test/parallel.config.cjs

 PASS   parallel  src/create-user-5.test.ts
 PASS   parallel  src/create-user-2.test.ts
 PASS   parallel  src/create-user-4.test.ts
 PASS   parallel  src/create-user-3.test.ts
 PASS   parallel  src/create-user-1.test.ts

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.951 s, estimated 2 s
Ran all test suites.
```
