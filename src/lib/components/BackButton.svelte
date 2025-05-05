<div class="left-side">
	<button class="back-button" aria-label="back" type="button" onclick={() => history.back()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="32px"
			viewBox="0 -960 960 960"
			width="32px"
			fill="currentColor"
			><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg
		>
	</button>
</div>

<style>
	.left-side {
		display: flex;
		flex: none;
		width: fit-content;
	}

	.back-button {
		margin-top: 6px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--festapp-button-text-color);
	}
</style>
