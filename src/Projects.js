import React from 'react';
import { Table, Input, Button, Icon } from 'antd';

const data = [
	{ key: '1', name: 'Project A', lead: 'Thomas Bridgers' }, 
	{ key: '2', name: 'Project B', lead: 'Chris Stahl' }, 
	{ key: '3', name: 'Project C', lead: 'Aaron Nguyen' }, 
	{ key: '4', name: 'Project D', lead: 'Daniel Kennedy' }
];

class Projects extends React.Component {
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
		const columns = [{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			
			// Search dropdown
			filterDropdown: (
				<div className="custom-filter-dropdown">
					<Input
						ref = {ele=> this.searchInput = ele}
						placeholder = "Search name"
						value = {this.state.searchText}
						onChange = {this.onInputChange}
						onPressEnter = {this.onSearch}
					/>
					<Button type="primary" onClick = {this.onSearch}>Search</Button>
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
		},
		{
			title: 'Lead', 
			dataIndex: 'lead', 
			key: 'lead',
			filters: [
				{ text: 'Aaron Nguyen', value: 'Aaron Nguyen' }, 
				{ text: 'Chris Stahl', value: 'Chris Stahl' },
				{ text: 'Daniel Kennedy', value: 'Daniel Kennedy' }, 
				{ text: 'Thomas Bridgers', value: 'Thomas Bridgers' }
			],
			onFilter: (value, record) => record.lead.indexOf(value) === 0
		}];

		return (
			<Table 
				columns = {columns} 
				dataSource = {this.state.data} 
				pagination = {false}
				footer = { ()=> <a href="#"> New </a> }
			/>
		)
	}
}

export default Projects