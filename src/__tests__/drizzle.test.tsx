import { mockedExpoSqliteNext } from '../ExpoSQLiteNext'

jest.mock(
  `${__dirname}/../../node_modules/expo-sqlite/build/ExpoSQLite`,
  () => mockedExpoSqliteNext
)
jest.mock(
  `${__dirname}/../../node_modules/expo-sqlite/build/pathUtils`,
  () => ({
    createDatabasePath: jest.fn().mockImplementation((databaseName: string) => {
      return databaseName
    }),
  })
)

import * as SQLite from 'expo-sqlite'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const testTable = sqliteTable('test', {
  id: int().primaryKey({ autoIncrement: true }),
  value: text(),
})

describe('drizzle', () => {
  it('insert with returning', async () => {
    const expo = SQLite.openDatabaseSync('')
    const db = drizzle(expo)

    await db.run(
      'CREATE TABLE test (id INTEGER PRIMARY KEY NOT NULL, value TEXT)'
    )

    expect(
      (
        await db
          .insert(testTable)
          .values({
            value: 'hello',
          })
          .returning()
      )[0]
    ).toMatchObject({
      id: 1,
      value: 'hello',
    })

    expect(await db.select().from(testTable).all()).toHaveLength(1)

    expect(
      await db
        .insert(testTable)
        .values([
          {
            value: 'a',
          },
          {
            value: 'b',
          },
        ])
        .returning()
    ).toMatchObject([
      { id: 2, value: 'a' },
      { id: 3, value: 'b' },
    ])

    expect(await db.select().from(testTable).all()).toHaveLength(3)

    await db.run('DROP TABLE test')
  })
})
