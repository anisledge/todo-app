"use strict";

var Todo = React.createClass({
	displayName: "Todo",

	getInitialState: function getInitialState() {
		return { editing: false };
	},
	edit: function edit() {
		console.log("edit todo");
		this.setState({ editing: true });
	},
	remove: function remove() {
		this.props.onRemove(this.props.index);
	},
	save: function save() {
		var val = this.newValue.value;
		this.props.onChange(val, this.props.index);
		this.setState({ editing: false });
	},
	todoDisplay: function todoDisplay() {
		return React.createElement(
			"li",
			{ className: "todo" },
			React.createElement(
				"span",
				{ onClick: this.edit },
				this.props.children
			),
			React.createElement("button", { onClick: this.remove, className: "btn btn-default btn-sm glyphicon glyphicon-trash remove pull-right" })
		);
	},
	todoForm: function todoForm() {
		var _this = this;

		return React.createElement(
			"li",
			{ className: "todo" },
			React.createElement(
				"span",
				null,
				React.createElement("input", { type: "text", ref: function ref(_ref) {
						return _this.newValue = _ref;
					}, placeholder: "Edit Todo", defaultValue: this.props.children })
			),
			React.createElement("button", { onClick: this.save, className: "btn btn-default btn-sm glyphicon glyphicon-floppy-disk remove pull-right" })
		);
	},
	render: function render() {
		if (this.state.editing) {
			return this.todoForm();
		} else {
			return this.todoDisplay();
		}
	}
});

var TodoList = React.createClass({
	displayName: "TodoList",

	getInitialState: function getInitialState() {
		return {
			todos: ['Call Henry', 'Pay Phone Bills', 'Make Dentist Appointment'],
			text: "",
			placeholder: "Add Todo",
			input_style: "form-control"
		};
	},
	onChange: function onChange(e) {
		this.setState({ text: e.target.value });
	},
	add: function add(e) {
		var arr = this.state.todos;
		var newTodo = this.newTodo.value;
		if (!newTodo) {
			e.preventDefault();
			this.setState({ placeholder: "Please Add Todo", input_style: "form-control red" });
		} else {
			arr.push(newTodo);
			this.setState({ todos: arr, text: "", placeholder: "Add Todo", input_style: "form-control" });
		}
	},
	remove: function remove(i) {
		var arr = this.state.todos;
		arr.splice(i, 1);
		this.setState({ todos: arr });
	},
	update: function update(newValue, i) {
		var arr = this.state.todos;
		arr[i] = newValue;
		this.setState({ todos: arr });
	},
	eachTodo: function eachTodo(todo, i) {
		return React.createElement(
			Todo,
			{ key: i,
				index: i,
				onChange: this.update,
				onRemove: this.remove },
			todo
		);
	},
	render: function render() {
		var _this2 = this;

		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Things to Do"
			),
			React.createElement(
				"div",
				{ className: "form-inline" },
				React.createElement(
					"div",
					{ className: "form-group" },
					React.createElement("input", { ref: function ref(_ref2) {
							return _this2.newTodo = _ref2;
						}, className: this.state.input_style, placeholder: this.state.placeholder, value: this.state.text, onChange: this.onChange }),
					React.createElement(
						"button",
						{ onClick: this.add, className: "btn btn-default btn-sm" },
						"+"
					)
				)
			),
			React.createElement(
				"ul",
				null,
				this.state.todos.map(this.eachTodo)
			)
		);
	}
});

ReactDOM.render(React.createElement(TodoList, null), document.getElementById("todo"));
