import { mockedExpoSqliteNext } from './ExpoSQLiteNext'

jest.mock(`${__dirname}/../../expo-sqlite/build/ExpoSQLite`, () => mockedExpoSqliteNext)
jest.mock(`${__dirname}/../../expo-sqlite/build/pathUtils`, () => ({
  createDatabasePath: jest.fn().mockImplementation((databaseName: string) => {
    return databaseName
  }),
}))
