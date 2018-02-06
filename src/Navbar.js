import React from 'react';
import { Menu, Icon } from 'antd';

class Navbar extends React.Component {
	// set initial state to home
	state = {
		selectedMenuItem: "home"
	}

	// set state to key at onClick event
	activeLink = (e)=> {
		this.setState({ 
			selectedMenuItem: e.key
		})
	}

	// render navbar menu
	render() {
		return(
			<Menu 
				mode = "horizontal" 
				onClick = { this.activeLink }
				selectedKey = {[ this.state.selectedMenuItem ]} 
			>
				<Menu.Item key = "home">
					<Icon type = "home"/> Home
				</Menu.Item>
				<Menu.Item key = "projects">
					<Icon type = "rocket"/> Projects
				</Menu.Item>
				<Menu.Item key = "associates">
					<Icon type = "profile"/> Associates
				</Menu.Item>
			</Menu>
		)
	}
}

export default Navbar