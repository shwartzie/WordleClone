import { Key } from "./Key";

export const Keyboard = () => {
    const keys1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3: string[] = ["Z", "X", "C", "V", "B", "N", "M"];

    return (
        <div className="keyboard">
            <div className="keyboard-key-container">
                {keys1.map((key) => (
                    <div className="key" key={key}>{key}</div>
                ))}
            </div>
            <div className="keyboard-key-container">
                {keys2.map((key) => (
                    <div className="key" key={key}>{key}</div>
                ))}
            </div>
            <div className="keyboard-key-container">
                <Key buttonType={'enter'} key={null}/>
                {keys3.map((key) => (
                    <div className="key" key={key}><Key buttonType={'key'} key={key}/></div>
                ))}
                <Key buttonType={'delete'} key={null}/>
            </div>
        </div>
    )
}