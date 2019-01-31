<template>
<div class="d-flex h-100 w-100 justify-content-center align-items-center">
	<half-circle-spinner
		:animation-duration="1000"
		:size="120"
		color="#e54325"
	/>
</div>
</template>

<script>
var HalfCircleSpinner = require ('epic-spinners/dist/lib/epic-spinners.min.js').HalfCircleSpinner;
module.exports = {
	name: 'Loading',
	components: {
		HalfCircleSpinner
	}
};
</script>