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

const modalHoc = (getProjects, user)=>{
	return props=>{
		return <ProjectFormModal {...props} getProjects = {getProjects} user={user} />
	}
}

class ProjectsTable extends React.Component {	
	state = { projects: [], leads: [] }
	
	classModalHoc = modalHoc( ()=>{
		return getApi_projects(
			this.setState.bind(this)
		)
	},
	this.props.googleToken.profileObj.email
 )

	componentWillMount(){
		getApi_projects(this.setState.bind(this))
	}

	render() {
		return (
			<div>
				<div className='jumboSmall'>
					<h1>Projects</h1>
					<h2>Project leads specify skill requirements by assigning team members (associates) to a project and indicating the skills required to complete a project. Simply create a project and the application will take care of the rest. Come back after your team members (associates) are done with their self assessment survey if you need to note a remediation plan.</h2>
				</div>
				<Table 
					columns = { columns( getUniqueArray(this.state.projects, 'lead'), this.props.match ) } 
					dataSource = {this.state.projects}
					title = { ()=> <p> Click <Link to={this.props.match.path + '/modal'}> <Icon type="file-add" /> </Link> to create a new project </p> }
					pagination={{ pageSize: 10 }}
					rowKey = 'id' 
				/>
				<Route exact path={this.props.match.path + '/modal'} render={this.classModalHoc}/> 
				<Route path={this.props.match.path + '/modal/:id'} render={this.classModalHoc}/>
			</div>
		)
	}
}

export default ProjectsTable