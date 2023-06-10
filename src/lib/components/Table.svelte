<script>
	import { winnerKeyState } from '../state/game';
	import { tableState } from '../state/table';
</script>

<div class="table">
	{#each $tableState as row, rowIndex}
		<div class="row">
			{#each row as cell, cellIndex}
				<div
					class="cell"
					on:keypress={() => !$winnerKeyState && tableState.updateCellValue(rowIndex, cellIndex)}
					on:click={() => !$winnerKeyState && tableState.updateCellValue(rowIndex, cellIndex)}
				>
					{cell}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.table {
		display: grid;
		grid-template-rows: repeat(3, 50px);
		border: 1px solid black;
		width: 150px;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(3, 50px);
	}

	.cell {
		border: 1px solid black;
		display: grid;
		place-items: center;
	}
</style>
