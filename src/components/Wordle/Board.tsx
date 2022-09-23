import { useEffect, useState } from "react";
import { Letter } from "../GameFunctions/Letter";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Keyboard } from "../GameFunctions/Keyboard";
import { BoardService } from '../../services/WordleService/board.service';

import { BoardCmpTypes } from "../../Types/Types";

export const Board = (p: BoardCmpTypes) => {
    console.log('p', p)
    return (
        <>
            <main className="game-container">
                {p.board && p.board.map((_: any, i: number) => (
                    <section className="row-container" key={i}>
                        {p.copyBoard && p.copyBoard.map((_: any, j: number) => (
                            <Letter
                                key={j}
                                letterPos={j} attemptVal={i}
                                board={p.board} correctWord={p.correctWord}
                                currentAttempt={p.currentAttempt}
                            />
                        ))}
                    </section>
                ))}
            </main>
            <Keyboard
                board={p.board} correctWord={p.correctWord}
                currentAttempt={p.currentAttempt} copyBoard={p.copyBoard}
            />

        </>
    );
};