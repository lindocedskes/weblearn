<script type="text/javascript">

	export default {
		props: ['todos', 'visibility'],
		computed: {		
			remaining: function () {
				return this.todos.filter(function (todo) {
					return !todo.completed;
				}).length;
			}
		},
		methods: {
			setFilter: function(filter){
				this.$dispatch('set-filter', filter)
			},
			removeCompleted: function(){
				this.$dispatch('remove-completed');
			}
		}
	}
</script>

<template>
	<footer class="footer">
		<span class="todo-count">
			<strong v-text="remaining"></strong>&nbsp;{{remaining | pluralize 'item'}} left
		</span>
		<ul class="filters">
			<li><a href="#/all" :class="{selected: visibility == 'all'}" @click="setFilter('all')">All</a></li>
			<li><a href="#/active" :class="{selected: visibility == 'active'}" @click="setFilter('active')">Active</a></li>
			<li><a href="#/completed" :class="{selected: visibility == 'completed'}" @click="setFilter('completed')">Completed</a></li>
		</ul>
		<button class="clear-completed" @click="removeCompleted">
			Clear completed
		</button>
	</footer>
</template>

<style lang="sass">
	.footer {
		color: #777;
		padding: 10px 15px;
		height: 20px;
		text-align: center;
		border-top: 1px solid #e6e6e6;
	}

	.footer:before {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 50px;
		overflow: hidden;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
		            0 8px 0 -3px #f6f6f6,
		            0 9px 1px -3px rgba(0, 0, 0, 0.2),
		            0 16px 0 -6px #f6f6f6,
		            0 17px 2px -6px rgba(0, 0, 0, 0.2);
	}

	.todo-count {
		float: left;
		text-align: left;
	}

	.todo-count strong {
		font-weight: 300;
	}

	.filters {
		margin: 0;
		padding: 0;
		list-style: none;
		position: absolute;
		right: 0;
		left: 0;
	}

	.filters li {
		display: inline;
	}

	.filters li a {
		color: inherit;
		margin: 3px;
		padding: 3px 7px;
		text-decoration: none;
		border: 1px solid transparent;
		border-radius: 3px;
	}

	.filters li a.selected,
	.filters li a:hover {
		border-color: rgba(175, 47, 47, 0.1);
	}

	.filters li a.selected {
		border-color: rgba(175, 47, 47, 0.2);
	}

	.clear-completed,
	html .clear-completed:active {
		float: right;
		position: relative;
		line-height: 20px;
		text-decoration: none;
		cursor: pointer;
		position: relative;
	}

	.clear-completed:hover {
		text-decoration: underline;
	}

	.info {
		margin: 65px auto 0;
		color: #bfbfbf;
		font-size: 10px;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
		text-align: center;
	}

	.info p {
		line-height: 1;
	}

	.info a {
		color: inherit;
		text-decoration: none;
		font-weight: 400;
	}

	.info a:hover {
		text-decoration: underline;
	}
</style>