<script>
	import { clearGame } from '../state';
	import { drawState } from '../state/game';
	import Modal from './common/Modal.svelte';
</script>

{#if $drawState}
	<Modal>
		<h3>Habéis quedado empate</h3>
		<div>
			<button on:click={() => clearGame()}>Volver a jugar</button>
			<a href="/"><button>Volver a configurar</button></a>
		</div>
	</Modal>
{/if}
