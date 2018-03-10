import React from 'react'
import { Table, Input, Icon } from 'antd'
import ProjectFormModal from './ProjectFormModal'
import {getUniqueArray} from 'array_utils'

const url = process.env.production? '159.65.189.161:3001' : 'http://localhost:3001'
// const url = '159.65.189.161:3001'

const statuses = [
	{ text: 'Draft', value: 'Draft' },
	{ text: 'Pending Review', value: 'Pending Review' },
	{ text: 'Approved', value: 'Approved' },
	{ text: 'Cancelled', value: 'Cancelled' }
]
const remediations = [
	{ text: 'None', value: 'None' },
	{ text: 'Training', value: 'Training' },
	{ text: 'In Source', value: 'In Source' },
	{ text: 'Out Source', value: 'Out Source' }
]
const skillGaps = [
	{ text: 'N/A', value: 'N/A' },
	{ text: 'Yes', value: 'Yes' },
	{ text: 'No', value: 'No' },
]

const getApi = (setState)=> {
	fetch( url + '/projects' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data: response })
	})
}

const filter = (dataArray)=>{
	return (key)=>{
		getUniqueArray(dataArray, key)
	}
}

const columns = [
	{ 
		title: 'Project ID',
		dataIndex: 'id'
	},
	{
		title: 'Project', 
		dataIndex: 'project'
	},
	{
		 title: 'Lead', 
		 dataIndex: 'lead'
	},
	{ 
		title: 'Status', 
		dataIndex: 'status'
	},
	{ 
		title: 'Remediation', 
		dataIndex: 'remediation'
	}
]

class ProjectsTable extends React.Component {
	componentWillMount(){
		getApi(this.setState.bind(this))
	}

	// set inital state
	state = {
		data: []
	}

	render() {
		return (
			<div>
				<h1>Projects</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<Table 
					columns = {columns} 
					dataSource = {this.state.data}
					title = { ()=> ( <p> Click <ProjectFormModal /> to create a new project </p> ) }
					pagination={{ pageSize: 5 }}
					rowKey = 'id' 
				/>
			</div>
		)
	}
}

export default ProjectsTable