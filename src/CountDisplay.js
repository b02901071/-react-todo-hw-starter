//const { Component } = React;
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

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

export default CountDisplay;
