import { derived, writable, type Readable, get } from 'svelte/store';
import { getLocalStorageValue, setLocalStorageValue } from '../utils/localStorage';
import { PLAYER_1, PLAYER_2 } from '../constants/player';
import { player1State, type Player, player2State } from './player';

const createCurrentPlayerStore = () => {
	const initialCurrentPlayerData = getLocalStorageValue('currentPlayerKey');
	const { subscribe, set, update } = writable<Player['key']>(
		initialCurrentPlayerData ? JSON.parse(initialCurrentPlayerData) : PLAYER_1
	);

	subscribe((value) => {
		setLocalStorageValue('currentPlayerKey', JSON.stringify(value));
	});

	return {
		subscribe,
		set,
		update,
		toggleCurrentPlayer: () => {
			update((value) => (value === PLAYER_1 ? PLAYER_2 : PLAYER_1));
		},
		clear: () => set(PLAYER_1)
	};
};

export const currentPlayerKeyState = createCurrentPlayerStore();

export const currentPlayerState: Readable<Player> = derived(
	currentPlayerKeyState,
	($currentPlayerKey) => {
		const currentPlayerData = getLocalStorageValue($currentPlayerKey);

		setLocalStorageValue('currentPlayer', currentPlayerData ?? '');

		return currentPlayerData ? JSON.parse(currentPlayerData) : '';
	}
);

const createWinnerKeyState = () => {
	const initialWinnerKeyData = getLocalStorageValue('winnerKey');
	const { subscribe, set, update } = writable<Player['key'] | undefined>(
		(initialWinnerKeyData as Player['key']) ?? undefined
	);

	subscribe((value) => {
		setLocalStorageValue('winnerKey', value ?? '');
	});

	return {
		subscribe,
		set,
		update
	};
};

export const winnerKeyState = createWinnerKeyState();

export const winnerState = derived(winnerKeyState, ($winnerKey) => {
	const player1 = get(player1State);
	const player2 = get(player2State);

	if ($winnerKey === player1.key) return player1;
	if ($winnerKey === player2.key) return player2;
});

const createDrawState = () => {
	const initialDrawData = getLocalStorageValue('draw');
	const { subscribe, set, update } = writable<boolean>(
		initialDrawData ? JSON.parse(initialDrawData) : false
	);

	subscribe((value) => {
		setLocalStorageValue('draw', JSON.stringify(value));
	});

	return {
		subscribe,
		set,
		update
	};
};

export const drawState = createDrawState();
