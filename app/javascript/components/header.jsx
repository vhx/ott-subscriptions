import React, { Component } from 'react';

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			img: props.img,
			title: props.title,
			desc: props.desc
		};
	}

	render() {
		return(
			<div className="header">
				<div className="img-container">
					<img src={this.state.img} />
				</div>
				<div className="text-container">
					<div id="title">{this.state.title}</div>
					<div id="desc">{this.state.desc}</div>
				</div>
			</div>
		);
	}

}

export default Header;