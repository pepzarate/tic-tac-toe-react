import { WINNER_OP } from "../constants";

export const checkWinner = (boardToCheck) => {
	for (const option of WINNER_OP) {
		const [a, b, c] = option;
		if (
			boardToCheck[a] &&
			boardToCheck[a] === boardToCheck[b] &&
			boardToCheck[a] === boardToCheck[c]
		)
			return boardToCheck[a];
	}
	return null;
};

export const checkEndGame = (newBoard) => {
	return newBoard.every((square) => square !== null);
};
