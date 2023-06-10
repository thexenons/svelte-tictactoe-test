import { get, writable } from 'svelte/store';
import { getLocalStorageValue, setLocalStorageValue } from '../utils/localStorage';
import { player1State, type Player, player2State } from './player';
import { currentPlayerKeyState, winnerKeyState, currentPlayerState, drawState } from './game';

type Cell = string;
type Line = [Cell, Cell, Cell];
type Table = [Line, Line, Line];

const checkLine = (line: Line, player: Player) => {
	const { key, symbol } = player;

	for (const cell of line) {
		if (cell !== symbol) return;
	}

	return key;
};

const getRows = (table: Table) => table as Line[];
const getColumns = (table: Table) =>
	[
		[table[0][0], table[1][0], table[2][0]],
		[table[0][1], table[1][1], table[2][1]],
		[table[0][2], table[1][2], table[2][2]]
	] as Line[];
const getDiagonals = (table: Table) =>
	[
		[table[0][0], table[1][1], table[2][2]],
		[table[0][2], table[1][1], table[2][0]]
	] as Line[];

const checkTable = (table: Table, players: Player[]): Player['key'] | undefined => {
	const lines: Line[] = [...getRows(table), ...getColumns(table), ...getDiagonals(table)];

	for (const line of lines) {
		for (const player of players) {
			const winner = checkLine(line, player);

			if (winner) return winner;
		}
	}
};

const checkDraw = (table: Table) => {
	for (const row of table) {
		for (const cell of row) {
			if (!cell) return false;
		}
	}

	return true;
};

const initialTable: Table = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];

const createTableState = () => {
	const initialTableData = getLocalStorageValue('currentGame');
	const { subscribe, set, update } = writable<Table>(
		initialTableData ? JSON.parse(initialTableData) : initialTable
	);

	subscribe((value) => {
		setLocalStorageValue('currentGame', JSON.stringify(value));
	});

	return {
		subscribe,
		set,
		update,
		updateCellValue: (rowIndex: number, cellIndex: number) =>
			update((currentTable: Table) => {
				const hasWinner = get(winnerKeyState);
				if (hasWinner || currentTable[rowIndex][cellIndex]) return currentTable;

				const newTable = structuredClone(currentTable);

				const currentPlayer = get(currentPlayerState);

				newTable[rowIndex][cellIndex] = currentPlayer.symbol;

				const player1 = get(player1State);
				const player2 = get(player2State);
				const winner = checkTable(newTable, [player1, player2]);
				if (winner) {
					winnerKeyState.set(winner);
				} else {
					currentPlayerKeyState.toggleCurrentPlayer();
				}

				if (!winner && checkDraw(newTable)) {
					drawState.set(true);
				}

				return newTable;
			}),
		clear: () => set(initialTable)
	};
};

export const tableState = createTableState();
