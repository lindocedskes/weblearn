(function(exports){
	'use strict';

	var filters = {
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
	};

	window.app = new Vue({
		el: '.todoapp',
		data: {
			todos: todoStorage.fetch(),
			newTodo: '',
			editedTodo: null,
			visibility: 'all'
		},
		//相关通过一定处理计算得到的值
		computed: {
			filterTodos: function(){
				return filters[this.visibility](this.todos);
			}
		},
		//自定义相关处理方法
		methods: {
			addTodo: function(){
				//this指Vue实例，他同时代理了data对象
				var value = this.newTodo && this.newTodo.trim();
				//如果值 为空，则不进行任何操作
				if(!value){
					return false;
				}
				this.todos.push({title: value, completed: false});
				this.newTodo = '';
			},
			removeTodo: function(todo){
				this.todos.$remove(todo);
			}
		}
	})

})(window);