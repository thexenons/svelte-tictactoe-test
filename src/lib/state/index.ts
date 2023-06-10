import { currentPlayerKeyState, drawState, winnerKeyState } from './game';
import { tableState } from './table';

export const clearGame = () => {
	tableState.clear();
	currentPlayerKeyState.clear();
	winnerKeyState.set(undefined);
	drawState.set(false);
};
