<script type="text/javascript">
	// import store from './store.js';
	import store from './store.js';

	export default {
		data: function(){
			return {
				newTodo: ''
			}
		},
		methods: {
			handleAddTodo: function(){
				var value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				store.addTodo(value);
				this.newTodo = '';
			}
		}
	}
</script>

<template>
	<input 
		class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" 
		v-model="newTodo"
		@keyup.enter="handleAddTodo"
	>
</template>

<style lang="sass">
	.new-todo,
	.edit {
		position: relative;
		margin: 0;
		width: 100%;
		font-size: 24px;
		font-family: inherit;
		font-weight: inherit;
		line-height: 1.4em;
		border: 0;
		outline: none;
		color: inherit;
		padding: 6px;
		border: 1px solid #999;
		box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-font-smoothing: antialiased;
		font-smoothing: antialiased;
	}

	.new-todo {
		padding: 16px 16px 16px 60px;
		border: none;
		background: rgba(0, 0, 0, 0.003);
		box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
	}
</style>