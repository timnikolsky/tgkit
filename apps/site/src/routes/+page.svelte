<div class="cover">
	<h1 class="cover-title">
		Develop Telegram&nbsp;Bots <span class="cover-highlight">with&nbsp;ease</span>
	</h1>
	<p class="cover-description">TgKit is a set of libraries for convinient Telegram apps and bots development</p>
	<a class="cover-button" href="https://github.com/timnikolsky/tgkit">GitHub Repo</a>
	<svg class="cover-back" width="768" height="667" viewBox="0 0 768 667" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M423.037 644.093C405.663 673.717 362.275 673.717 344.901 644.093L6.64809 67.3506C-11.6958 36.073 13.453 -2.59593 49.9751 0.816019L287.92 23.0453C308.985 25.0132 325.828 41.1401 328.442 61.8253L371.715 404.245C373.457 418.029 393.743 417.939 395.358 404.138L435.339 62.2402C437.78 41.3616 454.719 25.011 475.961 23.0506L718.076 0.705903C754.578 -2.66289 779.684 35.9875 761.352 67.2451L423.037 644.093Z" fill="var(--background-secondary)"/>
	</svg>
</div>

<style lang="scss">
	.cover {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		// margin-top: 8rem;
		text-align: center;
		gap: 2rem;
		height: 100%;
		justify-content: center;
		position: relative;

		:not(.cover-back) {
			z-index: 2;
		}
	}

	.cover-title {
		font-size: 5rem;
		line-height: 1.15;
		margin: 0;
		max-width: 70rem;
	}

	.cover-highlight {
		color: var(--accent);
	}

	.cover-description {
		margin: 0;
		font-size: 1.25rem;
		line-height: 2.5rem;
	}

	.cover-button {
		height: 3.5rem;
		border-radius: 1.75rem;
		padding: 0 2rem;
		font-size: 1rem;
		font-weight: 600;
		font-family: var(--font);
		background: var(--accent);
		border: none;
		outline: none;
		transition: 0.2s;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;

		&:hover, &:focus-visible {
			background: var(--accent-hover);
		}
	}

	.cover-back {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		z-index: 1;
	}
</style>
