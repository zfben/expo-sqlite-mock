import { mockedExpoSqliteNext } from './ExpoSQLiteNext'

jest.mock(`${__dirname}/../../expo-sqlite/build/ExpoSQLiteNext`, () => mockedExpoSqliteNext)
