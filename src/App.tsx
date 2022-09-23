import './styles/Main.scss';
import { AppHeader } from './components/AppHeader';
import { WordleApp } from './components/WordleApp';
import { createContext, useEffect, useState } from 'react';
import { BoardService } from './services/WordleService/board.service';
import React from 'react';
import { GameService } from './services/WordleService/game.service';
import { getTypeOf } from './Types/Types';

interface AppContextInterface {
  setBoard: (board: getTypeOf['Board']) => void,
  currentAttempt: getTypeOf['Attempt'],
  setCurrentAttempt: (attempt: getTypeOf['Attempt']) => void,
  correctWord: string,
  gameOver: getTypeOf['GameOver'],
  setGameOver: (gameOver: getTypeOf['GameOver']) => void,
  currentBoard: getTypeOf['Board'],
}

export const AppContext = createContext<AppContextInterface | null>(null);

function App() {
  const [board, setBoard] = useState<getTypeOf['Board']>();
  const [currentAttempt, setCurrentAttempt] = useState<getTypeOf['Attempt']>();
  const [correctWord, setCorrectWord] = useState<string>('');
  const [gameOver, setGameOver] = useState<getTypeOf['GameOver']>({ isGameOver: false, isGuessedWord: false });
  const [currentBoard, setCurrentBoard] = useState<getTypeOf['Board']>();
  //init
  useEffect(() => {
    const createdBoard: any = async () => await BoardService.getBoard();
    const attempt: getTypeOf['Attempt'] = GameService.getAttempt({ attempt: 0, letterPos: 0 });
    const correctWord: any = async () => await GameService.setDummyCorrectAnswer();
    const gameOver = { isGameOver: false, isGuessedWord: false };
    setBoard(createdBoard());
    setCurrentAttempt(attempt);
    setCorrectWord(correctWord());
    setGameOver(gameOver);
  }, []);

  useEffect(() => {
    const curr: any = async () => await BoardService.getBoard();
    setCurrentBoard(curr);
  }, [board]);

  return (
    <>
      <AppHeader />
      {currentBoard && currentAttempt && <AppContext.Provider value={
        { currentBoard, currentAttempt, setBoard, setCurrentAttempt, correctWord, gameOver, setGameOver }
      }>
        {currentBoard && currentAttempt && <WordleApp board={currentBoard} currentAttempt={currentAttempt} correctWord={correctWord} />}
      </AppContext.Provider>}
    </ >
  );
}

export default App;
