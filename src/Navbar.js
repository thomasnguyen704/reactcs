import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
	// set initial state to home
	state = {
		selectedMenuItem: 'home'
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
				mode = 'horizontal' 
				onClick = { this.activeLink }
				selectedKey = {[ this.state.selectedMenuItem ]}
				className = 'Navbar'
			>
				<Menu.Item key = 'home'>
					<Link to = '/home'>
						<Icon type = 'home'/> Home
					</Link>
				</Menu.Item>
				<Menu.Item key = 'projects'>
					<Link to = '/projects'> 
						<Icon type = 'rocket'/> Projects 
					</Link>
				</Menu.Item>
				<Menu.Item key = 'associates'>
					<Link to ='/associates'>
						<Icon type = 'user'/> Associates
					</Link>
				</Menu.Item>
			</Menu>
		)
	}
}

export default Navbar