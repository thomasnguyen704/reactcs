import React from 'react'
import { Modal, Form, Input, Select, Icon } from 'antd'
const url = process.env.production? '159.65.189.161:3001' : ''
const FormItem = Form.Item
const Option = Select.Option
const children = []

class ProjectFormModal extends React.Component {
    state = { visible: false }
    showModal = () => { this.setState({ visible: true }) }
    handleOk = (e) => { this.setState({ visible: false }) }
    handleCancel = (e) => { this.setState({ visible: false }) }

    render() {
        return (
            <span>
                <a type="primary" onClick = {this.showModal}> <Icon type = "form"/> </a>
                <Modal title="Project" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form className = "project">
                        <FormItem label = "Project Name">
                            <Input placeholder = "Project Name" />
                        </FormItem>
                        <FormItem label = "Status">
                            <Select showSearch defaultValue = "Draft">
                                <Option value = "Draft">Draft</Option>
                                <Option value = "Pending">Pending Review</Option>
                                <Option value = "Approved">Approved</Option>
                                <Option value = "Cancelled">Cancelled</Option>
                            </Select>
                        </FormItem>
                        <FormItem label = "Lead">
                            <Select showSearch>
                                <Option value = "Aaron_Bridgers">Aaron Bridgers</Option>
                                <Option value = "Chris_Kennedy">Chris Kennedy</Option>
                                <Option value = "Daniel_Stahl">Daniel Stahl</Option>
                                <Option value = "Thomas_Nguyen">Thomas Nguyen</Option>
                            </Select>
                        </FormItem>
                        <FormItem label = "Skill Requirements">
                            <Select mode = "tags" placeholder = "Skills Requirements">
                                {children}
                            </Select>
                        </FormItem>
                        <FormItem label = "Associates">
                            <Select showSearch mode = "multiple">
                                <Option value = "Aaron_Bridgers">Aaron Bridgers</Option>
                                <Option value = "Chris_Kennedy">Chris Kennedy</Option>
                                <Option value = "Daniel_Stahl">Daniel Stahl</Option>
                                <Option value = "Thomas_Nguyen">Thomas Nguyen</Option>
                            </Select>
                        </FormItem>
                        <FormItem label = "Skill Gap">
                            <Input disabled placeholder = "Based on entries by associates skills survey" />
                        </FormItem>
                        <FormItem label = "Remediation">
                            <Select showSearch mode = "multiple">
                                <Option value = "none">None</Option>
                                <Option value = "training">Training</Option>
                                <Option value = "insource">In Source</Option>
                                <Option value = "outsource">Out Source</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        )
    }
}
export default ProjectFormModal