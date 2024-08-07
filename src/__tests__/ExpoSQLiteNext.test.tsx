import { mockedExpoSqliteNext } from '../ExpoSQLiteNext'
import { Text } from 'react-native'
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite'
import { render, screen } from '@testing-library/react-native'
import { useEffect, useState } from 'react'

jest.mock(`${__dirname}/../../node_modules/expo-sqlite/build/ExpoSQLiteNext`, () => mockedExpoSqliteNext)

it('SQLiteProvider', async () => {
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
