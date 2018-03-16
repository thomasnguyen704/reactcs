import React from 'react'
import { Table, Input, Icon } from 'antd'
import ProjectFormModal from './ProjectFormModal'
import { getUniqueArray } from 'array_utils'
import {url} from './utils'

const getApi_projects = (setState)=> {
	fetch( url + '/projects' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ projects: response })
	})
}

const getApi_lead = (setState)=> {
	fetch( url + '/lead' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ leads: response })
	})
}

const columns = (associates)=> {
	return [
		{ 
			title: 'Project ID',
			dataIndex: 'id',
			sorter: (a, b)=> a.id - b.id,
			render: text=> <a href="#">{text}</a>
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
			filters: associates.map( ({ lead })=> ({ text: lead, value: lead }) ),
			onFilter: (value, record)=> record.lead.indexOf(value) === 0
		},
		{ 
			title: 'Status', 
			dataIndex: 'status',
			sorter: (a, b)=> a.status.length - b.status.length
		},
		{ 
			title: 'Remediation', 
			dataIndex: 'remediation',
			sorter: (a, b)=> a.remediation.length - b.remediation.length
		}
	]
}

class ProjectsTable extends React.Component {	
	state = {
		projects: [],
		leads: []
	}

	componentWillMount(){
		getApi_projects(this.setState.bind(this))
		//getApi_lead(this.setState.bind(this))
	}

	render() {
		return (
			<div>
				<h1>Projects</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<Table 
					columns = {columns(getUniqueArray(this.state.projects, 'lead'))} 
					dataSource = {this.state.projects}
					title = { ()=> <p> Click <ProjectFormModal /> to create a new project </p> }
					pagination={{ pageSize: 5 }}
					rowKey = 'id' 
				/>
			</div>
		)
	}
}

export default ProjectsTable