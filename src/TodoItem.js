//const { Component } = React;
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

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

export default TodoItem;
