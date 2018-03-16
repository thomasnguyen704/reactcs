import React from 'react'
import { Table, Input, Icon } from 'antd'
import ProjectFormModal from './ProjectFormModal'
import {getUniqueArray} from 'array_utils'

const url = process.env.production? '159.65.189.161:3001' : ''
// const url = '159.65.189.161:3001'

const Search = Input.Search

const getApi = (setState)=> {
	fetch( url + '/projects' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data: response })
	})
}
const getApi_ProjectLead = (setState)=> {
	fetch( url + '/lead' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data: response })
	})
}

const filter = (dataArray)=>{
	return (key)=>{ getUniqueArray(dataArray, key) }
}

const columns = [
	{ 
		title: 'Project ID',
		dataIndex: 'id',
		sorter: (a, b) => a.id - b.id,
		render: text => <a href="#">{text}</a>
	},
	{
		title: 'Lead', 
		dataIndex: 'lead',
		sorter: (a, b) => a.lead.length - b.lead.length,
		filters: [
			{ text: 'Daniel Stahl', value: 'Daniel Stahl' }, 
			{ text: 'Thomas Nguyen', value: 'Thomas Nguyen' }
		],
		onFilter: (value, record) => record.lead.indexOf(value) === 0
	},
	{
		title: 'Project Name', 
		dataIndex: 'project',
		sorter: (a, b) => a.project.length - b.project.length
	},
	{ 
		title: 'Status', 
		dataIndex: 'status',
		sorter: (a, b) => a.status.length - b.status.length
	},
	{ 
		title: 'Remediation', 
		dataIndex: 'remediation',
		sorter: (a, b) => a.remediation.length - b.remediation.length
	}
]

class ProjectsTable extends React.Component {	
	state = {
		data: []
	}

	componentWillMount(){
		getApi(this.setState.bind(this))
	}

	render() {
		return (
			<div>
				<h1>Projects</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<Table 
					columns = {columns} 
					dataSource = {this.state.data}
					title = { ()=> (
							<div>
								<p> Click <ProjectFormModal /> to create a new project </p> 
								<Search placeholder='Search By Project Name' onSearch={value => console.log(value)} enterButton />
							</div>
						)
					}
					pagination={{ pageSize: 5 }}
					rowKey = 'id' 
				/>
			</div>
		)
	}
}

export default ProjectsTable