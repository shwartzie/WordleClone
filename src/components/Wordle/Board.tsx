import { useEffect, useState } from "react";
import { Letter } from "../Helpers/Letter";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Keyboard } from "../Helpers/Keyboard";
import { BoardService } from '../../services/WordleService/board.service';
export const Board = () => {

    const context: any = useContext(AppContext);

    //inorder to render a board with 6 rows and 5 columns
    const copyBoard = BoardService.getBoardCopy(context.board);
    copyBoard.pop();

    return (
        <>
            <main className="game-container">
                {context.board.map((_: any, i: number) => (
                    <section className="row-container" key={i}>
                        {copyBoard.map((_: any, j: number) => (
                            <Letter key={j} letterPos={j} attemptVal={i}></Letter>
                        ))}
                    </section>
                ))}
            </main>
            <Keyboard />
        </>
    );
};