import React from 'react';
import { Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;

class ProjectForm extends React.Component {
	render() {
		return(
			<Form className="project">
				<FormItem label = "Project Name">
					<Input placeholder = "Project Name" />
				</FormItem>

				<FormItem label = "Lead">
					<Select />
				</FormItem>

				<Button type="primary" htmlType = "submit"> 
					Submit
				</Button>
			</Form>
		)
	}
}
export default ProjectForm