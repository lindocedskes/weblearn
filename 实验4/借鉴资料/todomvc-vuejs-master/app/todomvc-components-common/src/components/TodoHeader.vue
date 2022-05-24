<script>
	import TextInput from './TextInput.vue';

	export default {
		components: {
			TextInput
		},
	}

</script>

<template>
	<header class="header">
		<h1>todos</h1>
		<text-input></text-input>
	</header>
</template>

<style lang="sass">
.header h1 {
	position: absolute;
	top: -155px;
	width: 100%;
	font-size: 100px;
	font-weight: 100;
	text-align: center;
	color: rgba(175, 47, 47, 0.15);
	-webkit-text-rendering: optimizeLegibility;
	-moz-text-rendering: optimizeLegibility;
	text-rendering: optimizeLegibility;
}

</style>

