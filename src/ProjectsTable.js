import React from 'react'
import { Table, Icon } from 'antd'
import ProjectFormModal from './ProjectFormModal'
import { getUniqueArray } from 'array_utils'
import { url }  from './utils'
import { Route, Link } from 'react-router-dom'

const getApi_projects = (setState)=> {
	fetch( url + '/projects' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ projects: response })
	})
}

const columns = (selectFilter, match)=> {
	return [
		{ 
			title: 'Project ID',
			dataIndex: 'id',
			sorter: (a, b)=> a.id - b.id,
			defaultSortOrder: 'ascend',
			render: text=> <Link to={ match.url + '/modal/' + text }> {text} </Link>
		},
		{
			title: 'Project Name', 
			dataIndex: 'project',
			sorter: (a, b)=> a.project.length - b.project.length
		},
		{
			title: 'Lead', 
			dataIndex: 'lead',
			sorter: (a, b)=> a.lead.length - b.lead.length,
			filters: selectFilter.map( ({ lead })=> ({ text: lead, value: lead }) ),
			onFilter: (value, record)=> record.lead.indexOf(value) === 0
		},
		{ 
			title: 'Status', 
			dataIndex: 'status',
			sorter: (a, b)=> a.status.length - b.status.length,
			filters: selectFilter.map( ({ status })=> ({ text: status, value: status }) ),
			onFilter: (value, record)=> record.status.indexOf(value) === 0
		},
		{ 
			title: 'Remediation', 
			dataIndex: 'remediation',
			sorter: (a, b)=> a.remediation.length - b.remediation.length,
			filters: selectFilter.map( ({ remediation })=> ({ text: remediation, value: remediation }) ),
			onFilter: (value, record)=> record.remediation.indexOf(value) === 0
		}
	]
}

class ProjectsTable extends React.Component {	
	state = { projects: [], leads: [] }

	componentWillMount(){
		getApi_projects(this.setState.bind(this))
	}

	render() {
		return (
			<div>
				<h1>Projects</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<Table 
					columns = { columns( getUniqueArray(this.state.projects, 'lead'), this.props.match ) } 
					dataSource = {this.state.projects}
					title = { ()=> <p> Click <Link to={this.props.match.path + '/modal'}> <Icon type="file-add" /> </Link> to create a new project </p> }
					pagination={{ pageSize: 5 }}
					rowKey = 'id' 
				/>
				<Route exact path={this.props.match.path + '/modal'} component={ProjectFormModal}/> 
				<Route path={this.props.match.path + '/modal/:id'} component={ProjectFormModal}/>
			</div>
		)
	}
}

export default ProjectsTable