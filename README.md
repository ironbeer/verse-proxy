# Verse-layer-proxy
This is verse-layer's proxy to control access allow list.<br>
Verse-layer-proxy is made by [Nest](https://github.com/nestjs/nest).

## Set up transaction allow list
set allow list at src/shared/entities/src/TransactionAllowList.ts.

```typescript
// elements contained in the array are allowed to be transacted.
this.list = [
  {
    from: '0xaf395754eB6F542742784cE7702940C60465A46a',
    to: '0xaf395754eB6F542742784cE7702940C60465A46a',
  },
  {
    from: '0xaf395754eB6F542742784cE7702940C60465A46c',
    to: '0xaf395754eB6F542742784cE7702940C60465A46c',
  },
];

// '*' is wildcard.
this.list = [
  {
    from: '*',
    to: '*',
  },
];

// ! is denial.
// 0xaf395754eB6F542742784cE7702940C60465A46a are not allowed to be transacted.
this.list = [
  {
    from: '!0xaf395754eB6F542742784cE7702940C60465A46a',
    to: '!0xaf395754eB6F542742784cE7702940C60465A46a',
  },
];
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
