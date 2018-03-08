import React from 'react'
import { Table, Input, Icon } from 'antd'
import ProjectFormModal from './ProjectFormModal'
import {getUniqueArray} from 'array_utils'

const url = process.env.production? 'digitalOceanDomain' : 'http://localhost:3001'

const statuses = [
	{ text: 'Draft', value: 'Draft' }, 							// form is saved, but not complete and/or submitted
	{ text: 'Pending Review', value: 'Pending Review' }, 		// form is complete and submitted to governance (Aaron Bridgers)
	{ text: 'Approved', value: 'Approved' }, 					// governance helps manager address gaps and approves project
	{ text: 'Cancelled', value: 'Cancelled' } 					// the project is cancelled
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
		console.log(response)
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
		// Todo, comment more on what columns does.

		console.log('State: ', this.state)

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


/*
// set state at onInputChange event
onInputChange = (e) => {
	this.setState({ 
		searchText: e.target.value 
	})
}

// need to comment onSearch that makes sense
onSearch = () => {
	const { searchText } = this.state;
	const reg = new RegExp(searchText, 'gi');
	this.setState({
		filterDropdownVisible: false,
		filtered: !!searchText,
		data: data.map( (record)=> {
			const match = record.name.match(reg);
			if (!match) {
				return null;
			} 
			return {
				...record,
				name: ( <span> { record.name.split(reg).map( (text, i) => ( i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text )) } </span>),
			};
		}).filter(record => !!record)
	});
}

{
	title: 'Project',
	dataIndex: 'project',
	key: 'project',
	filterDropdown: (
		<div className="custom-filter-dropdown">
			<Input ref = {ele=> this.searchInput = ele} placeholder = "Search project" value = {this.state.searchText} onChange = {this.onInputChange} onPressEnter = {this.onSearch} />
		</div>
	),
	filterIcon: ( <Icon type = "search" style = {{ color: this.state.filtered ? '#108ee9' : '#aaa' }} /> ),
	filterDropdownVisible: this.state.filterDropdownVisible,
	onFilterDropdownVisibleChange: (visible) => {
		this.setState(
			{ filterDropdownVisible: visible }, 
			()=> this.searchInput && this.searchInput.focus()
		);
	},
	render: text=> ( 
		<div>
			<ProjectFormModal/> 
			<span style={{marginLeft: '25px'}}>{text}</span>
		</div>
	)
},
*/