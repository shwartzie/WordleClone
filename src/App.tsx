import './styles/Main.scss';
import { AppHeader } from './components/AppHeader';
import { WordleApp } from './components/WordleApp';
import { createContext, useEffect, useState } from 'react'
import { DefaultWords } from './components/Helpers/Words'
import React from 'react'

interface AppContextInterface {
  board: string[][],
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>
}

export const AppContext = createContext<AppContextInterface | null>(null)

function App() {

  const [board, setBoard] = useState<string[][]>(DefaultWords)

  useEffect(() => {
    setBoard(board)
  }, [DefaultWords])

  return (
    <div>
      <AppHeader />
      <AppContext.Provider value={{ board, setBoard }}>
        <WordleApp />
      </AppContext.Provider>
    </div>
  );
}

export default App;
