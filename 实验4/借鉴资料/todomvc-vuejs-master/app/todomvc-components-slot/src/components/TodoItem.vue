<script type="text/javascript">

	export default {
		props: ['todo', 'todos'],
		methods: {
			removeTodo: function(todo){
				this.todos.$remove(todo);
			}
		}
	}	

</script>

<template>
	<li :class="{completed: todo.completed, editing: todo == editedTodo}">
		<div class="view">
			<input class="toggle" type="checkbox" v-model="todo.completed">
			<label>{{todo.title}}</label>
			<button class="destroy" @click="removeTodo(todo)"></button>
		</div>
		<input class="edit" type="text">
	</li>
</template>

<style lang="sass">
	.todo-list li {
		position: relative;
		font-size: 24px;
		border-bottom: 1px solid #ededed;
	}

	.todo-list li:last-child {
		border-bottom: none;
	}

	.todo-list li.editing {
		border-bottom: none;
		padding: 0;
	}

	.todo-list li.editing .edit {
		display: block;
		width: 506px;
		padding: 13px 17px 12px 17px;
		margin: 0 0 0 43px;
	}

	.todo-list li.editing .view {
		display: none;
	}

	.todo-list li .toggle {
		text-align: center;
		width: 40px;
		/* auto, since non-WebKit browsers doesn't support input styling */
		height: auto;
		position: absolute;
		top: 8px;
		bottom: 0;
		margin: auto 0;
		border: none; /* Mobile Safari */
		-webkit-appearance: none;
		appearance: none;
	}

	.todo-list li .toggle:after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
	}

	.todo-list li .toggle:checked:after {
		content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
	}

	.todo-list li label {
		white-space: pre;
		word-break: break-word;
		padding: 15px 60px 15px 15px;
		margin-left: 45px;
		display: block;
		line-height: 1.2;
		transition: color 0.4s;
	}

	.todo-list li.completed label {
		color: #d9d9d9;
		text-decoration: line-through;
	}

	.todo-list li .destroy {
		display: none;
		position: absolute;
		top: 0;
		right: 10px;
		bottom: 0;
		width: 40px;
		height: 40px;
		margin: auto 0;
		font-size: 30px;
		color: #cc9a9a;
		margin-bottom: 11px;
		transition: color 0.2s ease-out;
	}

	.todo-list li .destroy:hover {
		color: #af5b5e;
	}

	.todo-list li .destroy:after {
		content: '×';
	}

	.todo-list li:hover .destroy {
		display: block;
	}

	.todo-list li .edit {
		display: none;
	}

	.todo-list li.editing:last-child {
		margin-bottom: -1px;
	}
</style>

