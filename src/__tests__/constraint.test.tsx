import * as SQLite from 'expo-sqlite'

describe('Constraint Error Handling', () => {
  it('should throw UNIQUE constraint violation on async insert', async () => {
    const db = SQLite.openDatabaseSync('')

    await db.execAsync(
      'CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, email TEXT UNIQUE)'
    )

    await db.runAsync(
      'INSERT INTO users (email) VALUES (?)',
      'test@example.com'
    )

    await expect(
      db.runAsync('INSERT INTO users (email) VALUES (?)', 'test@example.com')
    ).rejects.toThrow(/UNIQUE/i)
  })

  it('should throw UNIQUE constraint violation on sync insert', () => {
    const db = SQLite.openDatabaseSync('')

    db.execSync(
      'CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, email TEXT UNIQUE)'
    )

    db.runSync('INSERT INTO users (email) VALUES (?)', 'test@example.com')

    expect(() => {
      db.runSync('INSERT INTO users (email) VALUES (?)', 'test@example.com')
    }).toThrow(/UNIQUE/i)
  })

  it('should throw NOT NULL constraint violation on async insert', async () => {
    const db = SQLite.openDatabaseSync('')

    await db.execAsync(
      'CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL)'
    )

    await expect(
      db.runAsync('INSERT INTO users (id) VALUES (1)')
    ).rejects.toThrow(/NOT NULL/i)
  })

  it('should throw NOT NULL constraint violation on sync insert', () => {
    const db = SQLite.openDatabaseSync('')

    db.execSync(
      'CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL)'
    )

    expect(() => {
      db.runSync('INSERT INTO users (id) VALUES (1)')
    }).toThrow(/NOT NULL/i)
  })

  it('should handle FOREIGN KEY constraint violation', async () => {
    const db = SQLite.openDatabaseSync('')

    await db.execAsync('PRAGMA foreign_keys = ON')

    await db.execAsync(
      'CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, name TEXT)'
    )
    await db.execAsync(
      'CREATE TABLE posts (id INTEGER PRIMARY KEY NOT NULL, user_id INTEGER NOT NULL, FOREIGN KEY(user_id) REFERENCES users(id))'
    )

    await expect(
      db.runAsync('INSERT INTO posts (user_id) VALUES (999)')
    ).rejects.toThrow(/FOREIGN KEY/i)
  })
})
