import './styles/Main.scss';
import { AppHeader } from './components/AppHeader';
import { WordleApp } from './components/WordleApp';
import { createContext, useEffect, useState } from 'react';
import { BoardService } from './services/WordleService/board.service'
import React from 'react';
import { GameService } from './services/WordleService/game.service';

type Attempt = { attempt: number, letterPos: number; };

interface AppContextInterface {
  board: string[][],
  setBoard: (board: string[][]) => void,
  currentAttempt: Attempt,
  setCurrentAttempt: (attempt: Attempt) => void,
  correctWord: string
}

export const AppContext = createContext<AppContextInterface | null>(null);

function App() {
  const [board, setBoard] = useState<string[][]>();
  const [currentAttempt, setCurrentAttempt] = useState<Attempt>();
  const [correctWord, setCorrectWord] = useState<string>('')
  useEffect(() => {
    const createdBoard: string[][] = BoardService.getBoard();
    const attempt: Attempt = BoardService.getAttempt({ attempt: 0, letterPos: 0 });
    const correctWord = GameService.setDummyCorrectAnswer()
    setBoard(createdBoard);
    setCurrentAttempt(attempt);
    setCorrectWord(correctWord)
  }, []);




  return (
    <div>
      <AppHeader />
      {board && currentAttempt && <AppContext.Provider value={{ board, currentAttempt, setBoard, setCurrentAttempt, correctWord }}>
        <WordleApp />
      </AppContext.Provider>}
    </div >
  );
}

export default App;
