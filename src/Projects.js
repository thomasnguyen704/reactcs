import { Table, Input, Button, Icon } from 'antd';

const data = [
	  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' }
	, { key: '2', name: 'Joe Black', age: 42, address: 'London No. 1 Lake Park' }
	, { key: '3', name: 'Jim Green', age: 32, address: 'Sidney No. 1 Lake Park' }
	, { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' }
];

state = {
	filterDropdownVisible: false,
	data,
	searchText: '',
	filtered: false,
};
onInputChange = (e) => {
	this.setState({ searchText: e.target.value });
}
onSearch = () => {
	const { searchText } = this.state;
	const reg = new RegExp(searchText, 'gi');
	this.setState({
		filterDropdownVisible: false,
		filtered: !!searchText,
		data: data.map((record)=> {
			const match = record.name.match(reg);
			if (!match) {
				return null;
			}
			return {
				...record,
				name: (
					<span>{
						record.name.split(reg).map((text, i)=> (
							i>0 ? [ <span className="highlight"> {match[0]} </span>, text ] : text
						))
					}</span>
				),
			};
		}).filter(record => !!record),
	});
}

export default ()=> {
	const columns = [{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		filterDropdown: (
			<div className="custom-filter-dropdown">
				<Input
					ref={ele => this.searchInput = ele}
					placeholder="Search name"
					value={this.state.searchText}
					onChange={this.onInputChange}
					onPressEnter={this.onSearch}
				/>
				<Button 
					type="primary" 
					onClick={this.onSearch}>
					Search
				</Button>
			</div>
		),
		filterIcon: <Icon type="smile-o" />,
		filterDropdownVisible: this.state.filterDropdownVisible,
		onFilterDropdownVisibleChange: (visible) => {
			this.setState({
				filterDropdownVisible: visible,
			}, 
			() => this.searchInput && this.searchInput.focus());
		}
	}, 
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	}, 
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
		filters: [{
			text: 'London',
			value: 'London'
		}, 
		{
			text: 'New York',
			value: 'New York'
		}],
		onFilter: (value, record) => record.address.indexOf(value) === 0,
	}];
	return <Table columns={columns} dataSource={this.state.data} />;
}