var Todo = React.createClass({
	getInitialState: function() {
		return {editing:false}
	},
	edit: function() {
		console.log("edit todo");
		this.setState({editing:true});
	},
	remove: function() {
		this.props.onRemove(this.props.index);
	},		
	save: function() {
		var val = this.newValue.value;
		this.props.onChange(val, this.props.index);
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
			],
			text: "",
			placeholder: "Add Todo",
			input_style: "form-control" 
		};
	},
	onChange: function(e) {
		this.setState({text: e.target.value});
	},
	add: function(e) {
		var arr = this.state.todos;
		var newTodo = this.newTodo.value;
		if(!newTodo) {
			e.preventDefault();
			this.setState({placeholder: "Please Add Todo", input_style: "form-control red"});
		} else {
			arr.push(newTodo);
			this.setState({todos: arr, text: "", placeholder: "Add Todo", input_style: "form-control"});

		}
	},
	remove: function(i) {
		var arr = this.state.todos;
		arr.splice(i, 1);
		this.setState({todos: arr});
	},
	update: function(newValue, i) {
		var arr = this.state.todos;
		arr[i] = newValue;
		this.setState({todos: arr});
	},
	eachTodo: function(todo, i) {
		return <Todo key={i}
				     index={i}
				     onChange={this.update}
				     onRemove={this.remove}>
				{todo}
				</Todo>
	},
	render: function() {
		return (
			<div>

				<h1>Things to Do</h1>

				  <div className="form-inline">
					<div className="form-group">
						<input ref={(ref) => this.newTodo = ref} className={this.state.input_style} placeholder={this.state.placeholder} value={this.state.text} onChange={this.onChange}/>
						<button onClick={this.add} className="btn btn-default btn-sm">+</button>
					</div>
				  </div>
				<ul>
					{this.state.todos.map(this.eachTodo)}
				</ul>
			</div>
		);
	}
});

ReactDOM.render(<TodoList />, document.getElementById("todo"));


