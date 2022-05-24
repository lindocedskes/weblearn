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
			//当前显示的todos
			filterTodos: function(){
				return filters[this.visibility](this.todos);
			},
			//没有完成的todo
			remaining: function(){
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function () {
					console.log('get alldone')	
					return this.remaining === 0;
				},
				set: function (value) {
					console.log('set alldone');
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
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
				// this.todos.push({title: value, completed: false});
				this.todos.unshift({title: value, completed: false});
				this.newTodo = '';
			},
			//删除动作
			removeTodo: function(todo){
				console.log(todo);
				console.log(this);
				console.log(this.todos);
				console.log(this.todos.$remove);
				this.todos.$remove(todo);
			},
			//完成动作
			/*
			 * 官方demo没有这个动作，而是直接使用checkbox的选中属性绑定到了todo.completed上，
			 * 个人觉得这个写法不太直观，不易阅读，
			 * 于是添加了这个completed动作
			 */
			completedTodo: function(todo){
				todo.completed = !todo.completed;
			},
			//执行所有完成动作也在这里，执行
			removeCompleted: function(){
				this.todos = filters.active(this.todos);
			},
			//显示所有todos
			showAllTodos: function(){
				this.visibility = 'all';
			},
			//显示未完成的todos
			showActiveTodos: function(){
				this.visibility = 'active';
			},
			//显示已完成的todos
			showCompletedTodos: function(){
				this.visibility = 'completed';
			}
		}
	})

})(window);