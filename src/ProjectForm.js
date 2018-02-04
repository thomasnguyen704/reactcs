import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

export default ()=> {
	<Form className="project">
		<FormItem>
			<Input prefix={<Icon type="user"/>} placeholder="Username" />
		</FormItem>
		<FormItem>
			<Input prefix={<Icon type="lock"/>} type="password" placeholder="Password" />
		</FormItem>
		<Button type="primary" htmlType="submit" className="project-form-button">
			Log in
		</Button>
	</Form>
}