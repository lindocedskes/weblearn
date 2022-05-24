import storage from '../storage.js';

export default {
	state: {
		todos: storage.fetch(),
		editedTodo: null,
		visibility: 'all'
	},
	filters: {
		all: function (todos) {
			return todos;
		},
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		completed: function (todos) {
			return todos.filter(function (todo) {
				return todo.completed;
			});
		}
	},
	addTodo: function(value){
		this.state.todos.push({ title: value, completed: false })
	},
	removeTodo: function(todo, index){
		this.state.todos = this.state.todos.filter((todo, id) => id != index);
	},
	removeCompletedTodos: function(){
		this.state.todos = this.filters.active(this.state.todos);
	}
}