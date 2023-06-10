<script>
	import { onMount } from 'svelte';
	import { player1State, player2State } from '../state/player';
	import { clearGame } from '../state';

	onMount(() => {
		clearGame();
	});
</script>

<div>
	<h1>Configura tu juego</h1>
	<div>
		<h2>Jugador 1</h2>
		<p>¿Cuál es su nombre?</p>
		<input bind:value={$player1State.name} />
	</div>
	<div>
		<h2>Jugador 2</h2>
		<p>¿Cuál es su nombre?</p>
		<input bind:value={$player2State.name} />
	</div>
	<a href="/game">Iniciar juego</a>
</div>
