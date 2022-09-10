

export const Key = (p: { selectLetter: any, keyBtn: string, buttonType: string}) => {

    return (
        <div onClick={() => p.selectLetter(p.buttonType, p.keyBtn)} className="key-pressed">
            {p.keyBtn}
        </div>
    );
};