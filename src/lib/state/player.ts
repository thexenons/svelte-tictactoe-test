import { writable } from 'svelte/store';
import { getLocalStorageValue, setLocalStorageValue } from '../utils/localStorage';
import { PLAYER_1, PLAYER_2, TURN_O, TURN_X } from '../constants/player';

export interface Player {
	key: typeof PLAYER_1 | typeof PLAYER_2;
	name: string;
	symbol: typeof TURN_O | typeof TURN_X;
}

const createPlayerState = (initialPlayer: Player) => {
	const initialPlayerData = getLocalStorageValue(initialPlayer.key);
	const { subscribe, set, update } = writable<Player>(
		initialPlayerData ? JSON.parse(initialPlayerData) : initialPlayer
	);

	subscribe((value) => {
		setLocalStorageValue(initialPlayer.key, JSON.stringify(value));
	});

	return {
		subscribe,
		set,
		update,
		updateName: (value: string) =>
			update(() => ({ ...structuredClone(initialPlayer), name: value }))
	};
};

export const player1State = createPlayerState({ key: PLAYER_1, name: '', symbol: TURN_O });
export const player2State = createPlayerState({ key: PLAYER_2, name: '', symbol: TURN_X });
