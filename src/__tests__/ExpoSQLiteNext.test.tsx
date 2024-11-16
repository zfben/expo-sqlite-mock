import { mockedExpoSqliteNext } from '../ExpoSQLiteNext'
import { Text } from 'react-native'
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite'
import { render, screen } from '@testing-library/react-native'
import { useEffect, useState } from 'react'

jest.mock(`${__dirname}/../../node_modules/expo-sqlite/build/ExpoSQLite`, () => mockedExpoSqliteNext)
jest.mock(`${__dirname}/../../node_modules/expo-sqlite/build/pathUtils`, () => ({
  createDatabasePath: jest.fn().mockImplementation((databaseName: string) => {
    return databaseName
  }),
}))

describe('SQLiteProvider', () => {
  it('should work', async () => {
    function Test() {
      const db = useSQLiteContext()
      const [version, setVersion] = useState('')

      useEffect(() => {
        setVersion(db.getFirstSync<{ 'sqlite_version()': string }>('SELECT sqlite_version()')['sqlite_version()'])
      }, [])

      return <Text>{version}</Text>
    }

    function App() {
      return (
        <SQLiteProvider databaseName='test.db'>
          <Test />
        </SQLiteProvider>
      )
    }

    render(<App />)

    expect(await screen.findByText(/[0-9]+.[0-9]+.[0-9]+/)).toBeTruthy()
  })

  it('should crud', async () => {
    function Test() {
      const db = useSQLiteContext()
      const [value, setValue] = useState('')

      useEffect(() => {
        db.execSync('CREATE TABLE test (id INTEGER PRIMARY KEY NOT NULL, value TEXT)')
        db.execSync("INSERT INTO test (value) VALUES ('hello')")
        setValue(db.getFirstSync<{ value: string }>('SELECT value FROM test LIMIT 1').value)
      }, [])

      return <Text>{value}</Text>
    }

    function App() {
      return (
        <SQLiteProvider databaseName='test.db'>
          <Test />
        </SQLiteProvider>
      )
    }

    render(<App />)

    expect(await screen.findByText('hello')).toBeTruthy()
  })

  it('should auto reset', async () => {
    function Test() {
      const db = useSQLiteContext()
      const [value, setValue] = useState('')

      useEffect(() => {
        db.execSync('CREATE TABLE test (id INTEGER PRIMARY KEY NOT NULL, value TEXT)')
        db.execSync("INSERT INTO test (value) VALUES ('hello')")
        setValue(db.getFirstSync<{ value: string }>('SELECT value FROM test LIMIT 1').value)
      }, [])

      return <Text>{value}</Text>
    }

    function App() {
      return (
        <SQLiteProvider databaseName='test.db'>
          <Test />
        </SQLiteProvider>
      )
    }

    render(<App />)

    expect(await screen.findByText('hello')).toBeTruthy()
  })
})
