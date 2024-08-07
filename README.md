# expo-sqlite-mock

[![License: MIT](https://img.shields.io/npm/l/expo-sqlite-mock.svg)](https://github.com/zfben/expo-sqlite-mock/blob/main/packages/faasjs/jest/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/expo-sqlite-mock.svg)](https://www.npmjs.com/package/expo-sqlite-mock)

Use expo-sqlite with jest.

## Usage

1. `npm install -D expo-sqlite-mock` or `bun add -D expo-sqlite-mock`
2. Add `"setupFilesAfterEnv": ["expo-sqlite-mock/src/setup.ts"]` to your jest config (It's in `package.json` for default expo project).
