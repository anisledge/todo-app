"use strict";

var Todo = React.createClass({
	displayName: "Todo",

	getInitialState: function getInitialState() {
		return { editing: false };
	},
	edit: function edit() {
		alert("edit todo");
		this.setState({ editing: true });
	},
	remove: function remove() {
		alert("Todo removed");
	},
	save: function save() {
		var val = this.newValue.value;
		alert("Todo " + val + " saved");
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
			todos: ['Call Henry', 'Pay Phone Bills', 'Make Dentist Appointment']
		};
	},
	render: function render() {
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
					React.createElement("input", { className: "form-control", placeholder: "Add Todo" }),
					React.createElement(
						"button",
						{ className: "btn btn-default btn-sm" },
						"+"
					)
				)
			),
			React.createElement(
				"ul",
				null,
				this.state.todos.map(function (value, i) {
					return React.createElement(
						Todo,
						{ key: i },
						value
					);
				})
			)
		);
	}
});

ReactDOM.render(React.createElement(TodoList, null), document.getElementById("todo"));
