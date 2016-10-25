"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React,
    Component = _React.Component;

var TodoItem = function (_Component) {
	_inherits(TodoItem, _Component);

	function TodoItem(props) {
		_classCallCheck(this, TodoItem);

		var _this = _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).call(this, props));

		_this.handleDone = _this.handleDone.bind(_this);
		_this.handleDel = _this.handleDel.bind(_this);
		return _this;
	}

	_createClass(TodoItem, [{
		key: "handleDone",
		value: function handleDone() {
			this.props.fin(this.props.index);
		}
	}, {
		key: "handleDel",
		value: function handleDel() {
			this.props.del(this.props.index);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"li",
				{ className: this.props.done ? "completed" : "" },
				React.createElement(
					"div",
					{ className: "view" },
					React.createElement("input", { className: "toggle", type: "checkbox", onClick: this.handleDone }),
					React.createElement(
						"label",
						null,
						this.props.title
					),
					React.createElement("button", { className: "destroy", onClick: this.handleDel })
				)
			);
		}
	}]);

	return TodoItem;
}(Component);

var TodoList = function (_Component2) {
	_inherits(TodoList, _Component2);

	function TodoList() {
		_classCallCheck(this, TodoList);

		return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).apply(this, arguments));
	}

	_createClass(TodoList, [{
		key: "render",
		value: function render() {
			var _this3 = this;

			var list = this.props.list.map(function (todo, index) {
				return React.createElement(TodoItem, { title: todo, done: _this3.props.done[index], fin: _this3.props.fin_func, del: _this3.props.del_func, index: index });
			});
			return React.createElement(
				"ul",
				{ className: "todo-list" },
				list
			);
		}
	}]);

	return TodoList;
}(Component);

var CountDisplay = function (_Component3) {
	_inherits(CountDisplay, _Component3);

	function CountDisplay() {
		_classCallCheck(this, CountDisplay);

		return _possibleConstructorReturn(this, (CountDisplay.__proto__ || Object.getPrototypeOf(CountDisplay)).apply(this, arguments));
	}

	_createClass(CountDisplay, [{
		key: "render",
		value: function render() {
			var count = 0;
			for (var i = 0; i < this.props.done.length; i++) {
				if (this.props.done[i] === false) {
					count += 1;
				}
			}
			var str = "";
			if (count === 1) {
				str = "1 item left";
			} else {
				str = count + " items left";
			}
			return React.createElement(
				"span",
				{ className: "todo-count" },
				str
			);
		}
	}]);

	return CountDisplay;
}(Component);

var TodoApp = function (_Component4) {
	_inherits(TodoApp, _Component4);

	function TodoApp(props) {
		_classCallCheck(this, TodoApp);

		var _this5 = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props));

		_this5.state = { list: ['test', 'test2'], done: [false, false] };
		_this5.input = '';
		return _this5;
	}

	_createClass(TodoApp, [{
		key: "handleInput",
		value: function handleInput(event) {
			this.input = event.target.value;
		}
	}, {
		key: "handleSubmit",
		value: function handleSubmit(event) {
			if (event.key === "Enter" && this.input.trim() !== '') {
				this.state.list.push(this.input.trim());
				this.state.done.push(false);
				this.setState({ list: this.state.list, done: this.state.done });
				this.input = '';
				event.target.value = '';
			}
		}
	}, {
		key: "deleteTodo",
		value: function deleteTodo(index) {
			this.state.list.splice(index, 1);
			this.state.done.splice(index, 1);
			this.setState({ list: this.state.list, done: this.state.done });
		}
	}, {
		key: "finishTodo",
		value: function finishTodo(index) {
			if (this.state.done[index] === true) {
				this.state.done[index] = false;
			} else if (this.state.done[index] === false) {
				this.state.done[index] = true;
			}
			this.setState({ done: this.state.done });
		}
	}, {
		key: "toggleAll",
		value: function toggleAll() {
			var allDone = false;
			for (var i = 0; i < this.state.done.length; i++) {
				if (this.state.done[i] == false) {
					break;
				}
				if (i == this.state.done.length - 1) {
					allDone = true;
				}
			}
			if (allDone == true) {
				for (var _i = 0; _i < this.state.done.length; _i++) {
					this.state.done[_i] = false;
				}
			} else {
				for (var _i2 = 0; _i2 < this.state.done.length; _i2++) {
					this.state.done[_i2] = true;
				}
			}
			this.setState({ done: this.state.done });
		}
	}, {
		key: "clearCompleted",
		value: function clearCompleted() {
			var i = 0;
			while (i < this.state.done.length) {
				if (this.state.done[i]) {
					this.state.done.splice(i, 1);
					this.state.list.splice(i, 1);
				} else {
					i += 1;
				}
			}
			this.setState({ list: this.state.list, done: this.state.done });
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"section",
					{ className: "todoapp" },
					React.createElement(
						"header",
						{ className: "header" },
						React.createElement(
							"h1",
							null,
							"todos"
						),
						React.createElement("input", { className: "new-todo", placeholder: "What needs to be done?", autofocus: true, onChange: this.handleInput.bind(this), onKeyPress: this.handleSubmit.bind(this) })
					),
					React.createElement(
						"section",
						{ className: "main" },
						React.createElement("input", { className: "toggle-all", type: "checkbox", onClick: this.toggleAll.bind(this) }),
						React.createElement(
							"label",
							{ htmlFor: "toggle-all" },
							"Mark all as complete"
						),
						React.createElement(TodoList, { list: this.state.list, done: this.state.done, fin_func: this.finishTodo.bind(this), del_func: this.deleteTodo.bind(this) })
					),
					React.createElement(
						"footer",
						{ className: "footer" },
						React.createElement(CountDisplay, { done: this.state.done }),
						React.createElement(
							"button",
							{ className: "clear-completed", onClick: this.clearCompleted.bind(this) },
							"Clear completed"
						)
					)
				)
			);
		}
	}]);

	return TodoApp;
}(Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));