import { useEffect, useState } from "react"
import { Letter } from "../Helpers/Letter"
import { useContext } from "react"
import { AppContext } from "../../App"
import { Keyboard } from "../Helpers/Keyboard"
export const WordleMat = () => {

    const context: any = useContext(AppContext)

    return (
        <>
            <div className="game-container">
                {context.board.map((_: any, i: number) => (
                    <div className="row-container" key={i}>
                        {context.board.map((_: any, j: number) => (
                            <Letter key={j} letterPos={j} attemptVal={i}></Letter>
                        ))}
                    </div>
                ))}
            </div>
            <Keyboard />
        </>
    )
}