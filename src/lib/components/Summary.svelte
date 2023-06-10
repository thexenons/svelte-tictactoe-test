<script>
	import { clearGame } from '../state';
	import { currentPlayerState } from '../state/game';
</script>

<a href="/">Configurar nuevo juego</a>
<button
	on:click={() => {
		clearGame();
	}}>Reiniciar juego</button
>
<div class="summary">Turno de {$currentPlayerState.name ?? ''}</div>
