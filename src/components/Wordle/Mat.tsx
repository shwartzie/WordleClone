import { useEffect, useState } from "react"

export const WordleMat = (p: { size: number }) => {
    const [columns, setColumns] = useState<number[]>([])
    const [rows, setRows] = useState<number[]>([])
    // const setGridSize = () => {

    // }
    useEffect(() => {
        const columns: number[] = new Array(p.size).fill(1)
        const rows: number[] = new Array(p.size).fill(1)
        setColumns(columns)
        setRows(rows)
    }, [p.size])

    return (
        <div className="game-container">
            <div className="grid-container">
                {columns.map((_, i) => (
                    <div className="row-container" key={i}>
                        {
                            rows.map((_, j) => (
                                <div className="square" key={j}></div>
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}