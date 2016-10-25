const { Component } = React;

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.handleDone = this.handleDone.bind(this);
		this.handleDel = this.handleDel.bind(this);
	}

	handleDone() {
		this.props.fin(this.props.index);
	}

	handleDel() {
		this.props.del(this.props.index);
	}

	render() {
		return (<li className={(this.props.done)?"completed":""}>
				<div className="view">
					<input className="toggle" type="checkbox" onClick={this.handleDone} />
					<label>{this.props.title}</label>
					<button className="destroy" onClick={this.handleDel} />
				</div></li>);
	}
}


class TodoList extends Component {
	
	render() {
		var list = this.props.list.map((todo, index) => <TodoItem title={todo} done={this.props.done[index]} fin={this.props.fin_func} del={this.props.del_func} index={index}/>)
		return (
			<ul className="todo-list">
				{list}
			</ul>);
	}
}


class CountDisplay extends Component {
	render() {
		let count = 0;
		for( let i = 0; i < this.props.done.length; i++) {
			if (this.props.done[i] === false) {
				count += 1;
			}
		}
		let str = "";
		if (count === 1) { str = "1 item left"; }
		else { str = count + " items left"; }
		return <span className="todo-count">{str}</span>;
	}
}


class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.state = { list:['test', 'test2'], done:[false, false] };
		this.input = ''
	}

	handleInput(event) {
		this.input = event.target.value;
	}

	handleSubmit(event) {
		if (event.key === "Enter" && this.input.trim() !== '') {
			this.state.list.push(this.input.trim());
			this.state.done.push(false);
			this.setState({ list:this.state.list, done:this.state.done });
			this.input = '';
			event.target.value = '';
		}
	}

	deleteTodo(index) {
		this.state.list.splice(index, 1);
		this.state.done.splice(index, 1);
		this.setState({ list:this.state.list, done:this.state.done });
	}

	finishTodo(index) {
		if (this.state.done[index] === true) {
			this.state.done[index] = false;
		}
		else if (this.state.done[index] === false) {
			this.state.done[index] = true;
		}
		this.setState({ done:this.state.done });
	}

	toggleAll() {
		let allDone = false;
		for (let i = 0; i < this.state.done.length; i++) {
			if (this.state.done[i] == false) {
				break;
			}
			if ( i == (this.state.done.length-1) ) {
				allDone = true;
			}
		}
		if (allDone == true) {
			for (let i = 0; i < this.state.done.length; i++) {
				this.state.done[i] = false;
			}
		}
		else {
			for (let i = 0; i < this.state.done.length; i++) {
				this.state.done[i] = true;
			}
		}
		this.setState({ done:this.state.done });
	}
	
	clearCompleted() {
		let i = 0;
		while(i < this.state.done.length) {
			if (this.state.done[i]) {
				this.state.done.splice(i,1);
				this.state.list.splice(i,1);
			}
			else {
				i += 1;
			}
		}
		this.setState({ list:this.state.list, done:this.state.done });
	}

	render() {
		return( 
			<div>
			  <section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<input className="new-todo" placeholder="What needs to be done?" autofocus onChange={this.handleInput.bind(this)} onKeyPress={this.handleSubmit.bind(this)} />
				</header>
				<section className="main">
					<input className="toggle-all" type="checkbox" onClick={this.toggleAll.bind(this)}/>
					<label htmlFor="toggle-all">Mark all as complete</label>
					<TodoList list={this.state.list} done={this.state.done} fin_func={this.finishTodo.bind(this)} del_func={this.deleteTodo.bind(this)}/>
				</section>
				<footer className="footer">
					<CountDisplay done={this.state.done}/>
					<button className="clear-completed" onClick={this.clearCompleted.bind(this)}>Clear completed</button>
				</footer>
			  </section>
			</div>);
	}
}


ReactDOM.render(
		<TodoApp />,
		document.getElementById('root')
);
