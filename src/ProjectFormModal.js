import React from 'react';
import { Modal, Button, Form, Input, Select, Icon } from 'antd';

const FormItem = Form.Item;

class ProjectFormModal extends React.Component {
    state = { 
        visible: false 
    }
    showModal = () => {
        this.setState({
            visible: true
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        return (
            <span>
                <a type="primary" onClick={this.showModal} style={{marginRight: '25px'}}> <Icon type="form"/> </a>
                <Modal
                    title="Project"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
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
                </Modal>
            </span>
        );
    }
}

export default ProjectFormModal

// <Button type="primary" onClick={this.showModal}>Open</Button>