import React from 'react';
import { Table, Input, Icon } from 'antd';
import ProjectFormModal from './ProjectFormModal';

const data = [
	{ key: '1', name: 'Project A', lead: 'Thomas Nguyen', status: 'Draft', remediation: 'Training' }, 
	{ key: '2', name: 'Project B', lead: 'Chris Kennedy', status: 'Pending Review', remediation: 'In Source' }, 
	{ key: '3', name: 'Project C', lead: 'Aaron Bridgers', status: 'Approved', remediation: 'Out Srouce' }, 
	{ key: '4', name: 'Project D', lead: 'Daniel Stahl', status: 'Cancelled', remediation: 'N/A' }
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
	{ text: 'Out Source', value: 'Out Source' },
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
				<Table 
					columns = {columns} 
					dataSource = {this.state.data} 
					title = { 
						()=> (
							<p> Click <ProjectFormModal /> to create a new project </p>
						) 
					}
					pagination={{ pageSize: 50 }} 
				/>
			</div>
		)
	}
}

export default ProjectsTable