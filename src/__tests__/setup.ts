jest.mock(
  `${__dirname}/../../node_modules/expo-sqlite/build/ExpoSQLite`,
  () => require('../ExpoSQLiteNext').mockedExpoSqliteNext
)
jest.mock(
  `${__dirname}/../../node_modules/expo-sqlite/build/pathUtils`,
  () => ({
    createDatabasePath: jest.fn().mockImplementation((databaseName: string) => {
      return databaseName
    }),
  })
)
