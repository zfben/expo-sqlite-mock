# expo-sqlite-mock

[![License: MIT](https://img.shields.io/npm/l/expo-sqlite-mock.svg)](https://github.com/zfben/expo-sqlite-mock/blob/main/packages/faasjs/jest/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/expo-sqlite-mock.svg)](https://www.npmjs.com/package/expo-sqlite-mock)

Use [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) with jest.

## Notice

- **^3.0.0** is for expo-sqlite >=53.
- **^2.0.0** is for expo-sqlite ~52.
- **^1.0.0** is for expo-sqlite ~51.

## Usage

1. `npm install -D expo-sqlite-mock` or `bun add -D expo-sqlite-mock`
2. Add `"setupFilesAfterEnv": ["expo-sqlite-mock/src/setup.ts"]` and `"testTimeout": 10000` to your jest config (It's in `package.json` for default expo project).

Example:

```json
{
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["expo-sqlite-mock/src/setup.ts"],
    "testTimeout": 10000
  }
}
```

### Advanced

You can set the `EXPO_SQLITE_MOCK` environment variable to a custom SQLite database location.

Tips:

1. Please use `JEST_WORKER_ID` to avoid concurrent test cases writing to the same file.
2. Update your `.gitignore` to ignore the SQLite database file.

Example:

```ts
it("test", async () => {
  // or you can set it beforeAll or beforeEach
  process.env.EXPO_SQLITE_MOCK = `${__dirname}/test_${process.env.JEST_WORKER_ID}.db`;

  // your test code

  // clear the env var
  delete process.env.EXPO_SQLITE_MOCK;
});
```

## Changelog

- **3.0.2**
  - Constraint error handling.

- **3.0.0**
  - Compatible with expo-sqlite ~15 and expo ~53.

- **2.2.0**
  - Compatible with drizzle
  - Clean up the code

- **2.1.0**
  - Support custom SQLite database location by setting the `EXPO_SQLITE_MOCK` environment variable.
  - Update peer dependencies.

- **2.0.1**
  - Fix setup.

- **2.0.0**
  - Update for expo-sqlite ~52.

- **1.0.0**
  - Initial version.
