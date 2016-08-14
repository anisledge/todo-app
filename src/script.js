var Todo = React.createClass({
	getInitialState: function() {
		return {editing:false}
	},
	edit: function() {
		alert("edit todo");
		this.setState({editing:true});
	},
	remove: function() {
		alert("Todo removed");
	},		
	save: function() {
		var val = this.newValue.value;
		alert("Todo " + val + " saved");
		this.setState({editing:false});
	},
	todoDisplay: function() {
		return (
				<li className="todo">

				  <span onClick={this.edit}>
					{this.props.children}
				  </span>

				  <button onClick={this.remove} className="btn btn-default btn-sm glyphicon glyphicon-trash remove pull-right"/>

				</li>
		);		
	},
	todoForm: function() {
		return (
			<li className="todo">
				<span>
					<input type="text" ref={(ref) => this.newValue = ref} placeholder="Edit Todo" defaultValue={this.props.children} /> 
				</span>

				<button onClick={this.save} className="btn btn-default btn-sm glyphicon glyphicon-floppy-disk remove pull-right"/>
			</li>
		)
	},
	render: function() {
		if (this.state.editing) {
			return this.todoForm();
		} else {
			return this.todoDisplay();
		}

	}
});

var TodoList = React.createClass({
	getInitialState: function() {
		return {
			todos: [
				'Call Henry',
				'Pay Phone Bills',
				'Make Dentist Appointment'
			]
		};
	},
	update: function(newValue, i) {
		var arr = this.state.todos;
		arr[i] = newValue;
		this.setState({todos: arr});
	},
	render: function() {
		return (
			<div>

				<h1>Things to Do</h1>

				  <div className="form-inline">
					<div className="form-group">
						<input className="form-control" placeholder="Add Todo" />
						<button className="btn btn-default btn-sm">+</button>
					</div>
				  </div>
				<ul>
					{this.state.todos.map(function(value, i) {
						return <Todo key={i}>{value}</Todo>
					})}
				</ul>
			</div>
		);
	}
});

ReactDOM.render(<TodoList />, document.getElementById("todo"));


