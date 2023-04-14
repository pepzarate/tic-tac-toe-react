import confetti from "canvas-confetti";
import { useState } from "react";
import Square from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./logic/storage";
function App() {
	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem("board");
		if (boardFromStorage) return JSON.parse(boardFromStorage);
		else return Array(9).fill(null);
	});

	const [turn, setTurn] = useState(TURNS.X);
	const [winner, setWinner] = useState(null);

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
		//Guardar la partida
		saveGameToStorage({
			board: newBoard,
			turn: newTurn,
		});

		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			confetti();
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) setWinner(false);
	};

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setWinner(null);
		setTurn(TURNS.X);

		resetGameStorage();
	};

	return (
		<main className="board">
			<h1>Tic Tac Toe</h1>
			<button onClick={resetGame}>Empezar de nuevo</button>
			<section className="game">
				{board.map((square, index) => {
					return (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{square}
						</Square>
					);
				})}
			</section>
			<section className="turn">
				<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
			</section>

			<WinnerModal winner={winner} resetGame={resetGame} />
		</main>
	);
}

export default App;
