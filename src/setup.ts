import { mockedExpoSqliteNext } from './ExpoSQLiteNext'
import { existsSync } from 'node:fs'

if (existsSync(`${__dirname}/../../expo-sqlite/build/ExpoSQLiteNext`))
  jest.mock(`${__dirname}/../../expo-sqlite/build/ExpoSQLiteNext`, () => mockedExpoSqliteNext)
else {
  jest.mock(`${__dirname}/../../expo-sqlite/build/ExpoSQLite`, () => mockedExpoSqliteNext)
  jest.mock(`${__dirname}/../../expo-sqlite/build/pathUtils`, () => ({
    createDatabasePath: jest.fn().mockImplementation((databaseName: string) => {
      return databaseName
    }),
  }))
}
