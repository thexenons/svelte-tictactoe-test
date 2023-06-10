<script>
	import { clearGame } from '../state';
	import { winnerState } from '../state/game';
	import Modal from './common/Modal.svelte';
</script>

{#if $winnerState}
	<Modal>
		<h3>Ha ganado {$winnerState.name}!</h3>
		<div>
			<button on:click={() => clearGame()}>Volver a jugar</button>
			<a href="/"><button>Volver a configurar</button></a>
		</div>
	</Modal>
{/if}
