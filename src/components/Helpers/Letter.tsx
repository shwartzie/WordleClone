import { useContext } from "react"
import { AppContext } from "../../App"
export const Letter = (p: { letterPos: number, attemptVal: number }) => {
    const context: any = useContext(AppContext)
    const letter: string = context.board[p.attemptVal][p.letterPos]
    return <div className="letter">{letter}</div>
}