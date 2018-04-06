import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { url }  from './utils'

const FormItem = Form.Item
const Option = Select.Option
const children = []

const getApi_project = (setState, id)=> {
	fetch( url + '/projects/' + id )
	.then( response=> response.json() )
	.then( response=> {
        // console.log(response)
		setState(response)
	})
}

const getApi_users = (setState)=> {
    fetch( url + '/users' )
	.then( response=> response.json() )
	.then( response=> {
		setState({
            users: response
        })
	})
}

class ProjectFormModal extends React.Component {
    state = { 
        visible: false,
        project: '',
        status: 'Draft',
        lead: '',
        skillReq: [],
        associates: [],
        skillGap: '',
        remediation: [],
        users: []
    }

    componentWillMount(){
        getApi_users(
            this.setState.bind(this)
        )
        if( this.props.match.params && this.props.match.params.id ) {
            getApi_project( 
                this.setState.bind(this), 
                this.props.match.params.id
            )

        }
    }
    
    handleOk = e=> {}
    handleCancel = e=> { this.props.history.goBack() } 

    render() {
        return (
            <Modal title="Project" visible={true} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Form className = "project">

                    <FormItem label = "Project Name">
                        <Input value={this.state.project} placeholder = "Project Name" />
                    </FormItem>

                    <FormItem label = "Status">
                        <Select showSearch value={this.state.status}>
                            <Option value = "Draft">Draft</Option>
                            <Option value = "Pending">Pending Review</Option>
                            <Option value = "Approved">Approved</Option>
                            <Option value = "Cancelled">Cancelled</Option>
                        </Select>
                    </FormItem>

                    <FormItem label = "Lead">
                        <Select showSearch value={this.state.lead}>
                            <Option value = "AaronTBridgers@gmail.com">Aaron Bridgers</Option>
                            <Option value = "chris_Kennedy@kenan-flagler.unc.edu">Chris Kennedy</Option>
                            <Option value = "danstahl1138@gmail.com">Daniel Stahl</Option>
                            <Option value = "thomasnguyen704@gmail.com">Thomas Nguyen</Option>
                        </Select>
                    </FormItem>

                    <FormItem label = "Skill Requirements">
                        <Select mode = "tags" placeholder = "Skills Requirements" value={this.state.skillReq}>
                            {children}
                        </Select>
                    </FormItem>

                    <FormItem label = "Associates">
                        <Select 
                            showSearch 
                            mode = "multiple" 
                            value= { this.state.associates.map( row=> row.associate ) } // load only checked associates
                            optionLabelProp='associate'
                        >
                            {
                                this.state.users.map( (row)=>{ // load all associates
                                    return ( <Option value={row.user}> {row.username} </Option> )
                                })
                            }
                        </Select>
                    </FormItem>

                    <FormItem label = "Skill Gap">
                        <Input disabled placeholder = "Based on entries by associates skills survey" value={this.state.skillGap}/>
                    </FormItem>

                    <FormItem label = "Remediation">
                        <Select showSearch mode = "multiple" value={this.state.remediation}>
                            <Option value = "training">Training</Option>
                            <Option value = "insource">In Source</Option>
                            <Option value = "outsource">Out Source</Option>
                        </Select>
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}
export default ProjectFormModal