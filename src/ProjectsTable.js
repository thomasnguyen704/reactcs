import React from 'react'
import { Table, Input, Icon } from 'antd'
import ProjectFormModal from './ProjectFormModal'

const data = [
	{ key: '1', name: 'Project A', lead: 'Thomas Nguyen', status: 'Draft', remediation: 'Training' }, 
	{ key: '2', name: 'Project B', lead: 'Chris Kennedy', status: 'Pending Review', remediation: 'In Source' }, 
	{ key: '3', name: 'Project C', lead: 'Aaron Bridgers', status: 'Approved', remediation: 'Out Source' }, 
	{ key: '4', name: 'Project D', lead: 'Daniel Stahl', status: 'Cancelled', remediation: 'N/A' },
	{ key: '5', name: 'Project E', lead: 'Thomas Nguyen', status: 'Draft', remediation: 'Training' }, 
	{ key: '6', name: 'Project F', lead: 'Chris Kennedy', status: 'Pending Review', remediation: 'In Source' }, 
	{ key: '7', name: 'Project G', lead: 'Aaron Bridgers', status: 'Approved', remediation: 'Out Source' }, 
	{ key: '8', name: 'Project H', lead: 'Daniel Stahl', status: 'Cancelled', remediation: 'N/A' },
	{ key: '9', name: 'Project I', lead: 'Thomas Nguyen', status: 'Draft', remediation: 'Training' }, 
	{ key: '10', name: 'Project J', lead: 'Chris Kennedy', status: 'Pending Review', remediation: 'In Source' }, 
	{ key: '11', name: 'Project K', lead: 'Aaron Bridgers', status: 'Approved', remediation: 'Out Source' }, 
	{ key: '12', name: 'Project L', lead: 'Daniel Stahl', status: 'Cancelled', remediation: 'N/A' },
	{ key: '13', name: 'Project M', lead: 'Thomas Nguyen', status: 'Draft', remediation: 'Training' }, 
	{ key: '14', name: 'Project N', lead: 'Chris Kennedy', status: 'Pending Review', remediation: 'In Source' }, 
	{ key: '15', name: 'Project O', lead: 'Aaron Bridgers', status: 'Approved', remediation: 'Out Source' }, 
	{ key: '16', name: 'Project P', lead: 'Daniel Stahl', status: 'Cancelled', remediation: 'N/A' },
	{ key: '17', name: 'Project Q', lead: 'Thomas Nguyen', status: 'Draft', remediation: 'Training' }, 
	{ key: '18', name: 'Project R', lead: 'Chris Kennedy', status: 'Pending Review', remediation: 'In Source' }, 
	{ key: '19', name: 'Project S', lead: 'Aaron Bridgers', status: 'Approved', remediation: 'Out Source' }, 
	{ key: '20', name: 'Project T', lead: 'Daniel Stahl', status: 'Cancelled', remediation: 'N/A' }
]
const associates = [
	{ text: 'Aaron Bridgers', value: 'Aaron Bridgers' }, // Governance
	{ text: 'Chris Kennedy', value: 'Chris Kennedy' },
	{ text: 'Daniel Stahl', value: 'Daniel Stahl' }, 
	{ text: 'Thomas Nguyen', value: 'Thomas Nguyen' }
]
const statuses = [
	{ text: 'Draft', value: 'Draft' }, // form is saved, but not complete and/or submitted
	{ text: 'Pending Review', value: 'Pending Review' }, // form is complete and submitted to governance (Aaron Bridgers)
	{ text: 'Approved', value: 'Approved' }, // governance helps manager address gaps and approves project
	{ text: 'Cancelled', value: 'Cancelled' } // the project is cancelled
]
const remediations = [
	{ text: 'N/A', value: 'N/A' },
	{ text: 'Training', value: 'Training' },
	{ text: 'In Source', value: 'In Source' },
	{ text: 'Out Source', value: 'Out Source' }
]

class ProjectsTable extends React.Component {
	// set inital state
	state = {
		filterDropdownVisible: false, 
		data, 
		searchText: '', 
		filtered: false
	}

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
					name: (
						<span>
							{
								record.name.split(reg).map( (text, i) => (
									i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
								))
							}
						</span>
					),
				};
			}).filter(record => !!record),
		});
	}
	
	render() {
		// Create columns for table data.
		// Todo, comment more on what columns does.
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				filterDropdown: (
					<div className="custom-filter-dropdown">
						<Input
							ref = {ele=> this.searchInput = ele}
							placeholder = "Search name"
							value = {this.state.searchText}
							onChange = {this.onInputChange}
							onPressEnter = {this.onSearch}
						/>
					</div>
				),
				filterIcon: (
					<Icon type = "search" style = {{ color: this.state.filtered ? '#108ee9' : '#aaa' }} /> // todo: move the inline style
				),
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
			{
				title: 'Lead', 
				dataIndex: 'lead', 
				key: 'lead',
				filters: associates,
				onFilter: (value, record) => record.lead.indexOf(value) === 0
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
				filters: statuses,
				onFilter: (value, record) => record.status.indexOf(value) === 0
			},
			{
				title: 'Remediation',
				dataIndex: 'remediation',
				key: 'remediation',
				filters: remediations,
				onFilter: (value, record) => record.remediation.indexOf(value) === 0
			}
		];

		return (
			<div>
				<h1>Projects</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<Table 
					columns = {columns} 
					dataSource = {this.state.data} 
					title = { 
						()=> (
							<p> Click <ProjectFormModal /> to create a new project </p>
						) 
					}
					pagination={{ pageSize: 5 }} 
				/>
			</div>
		)
	}
}

export default ProjectsTable