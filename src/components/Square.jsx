import "./Square.css"

export default function Square({value, handleOnClick}) {
    return (
        <div className="square" onClick={handleOnClick}>
            {value}
        </div>
    )
}