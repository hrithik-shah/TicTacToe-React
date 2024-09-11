import Square from "./Square.jsx";
import "./Board.css"
import {useEffect, useLayoutEffect, useState} from "react";

export default function Board() {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
    const [player, setPlayer] = useState('X')
    const next_player = {'X': 'O', 'O': 'X'}

    const GameState = Object.freeze({
        PlayerXWins: "PlayerXWins",
        PlayerOWins: "PlayerOWins",
        GameDraw: "GameDraw",
        GameInPlay: "GameInPlay"
    });

    useEffect(() => {
        setTimeout(() => {
            const game_state = getGameState()
            switch (game_state) {
                case GameState.PlayerXWins:
                    alert("X Wins!")
                    break
                case GameState.PlayerOWins:
                    alert("O Wins!")
                    break
                case GameState.GameDraw:
                    alert("Game Draw")
                    break
                default:
                    break
            }
            if (game_state !== GameState.GameInPlay) {
                setBoard(["", "", "", "", "", "", "", "", ""])
                setPlayer('X')
            }
        }, 10)
    }, [board, player]);

    function handleOnClick(index) {
        if (board[index] !== "") return

        setBoard(prevBoard => {
            const newBoard = [...prevBoard]
            newBoard[index] = player
            return newBoard
        })
        setPlayer(oldPlayer => next_player[oldPlayer])
    }

    function getGameState() {
        const win_patterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < win_patterns.length; i++) {
            const [i1, i2, i3] = win_patterns[i]
            if (board[i1] === board[i2] && board[i2] === board[i3] && board[i3] === 'X') {
                return GameState.PlayerXWins
            }
            if (board[i1] === board[i2] && board[i2] === board[i3] && board[i3] === 'O') {
                return GameState.PlayerOWins
            }
        }

        const full_board = board.every(v => v !== '')
        if (full_board) {
            return GameState.GameDraw
        }
        return GameState.GameInPlay
    }

    return (
        <div className="board">
            {
                board.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        handleOnClick={() => handleOnClick(index)}
                    />
                ))
            }
        </div>
    )
}