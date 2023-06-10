<script>
	import Card from './Card.svelte';
	import Overlay from './Overlay.svelte';
</script>

<Overlay>
	<Card>
		<slot />
	</Card>
</Overlay>
