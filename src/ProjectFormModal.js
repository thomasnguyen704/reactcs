import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { url }  from './utils'

const FormItem = Form.Item
const Option = Select.Option
let children = []

const getApi_project = (setState, id)=> {
	fetch( url + '/projects/' + id )
	.then( response=> response.json() )
	.then( response=> {
        const { project, status, lead, lead_name, remediation, skills, associates } = response
        setState({ 
            project, 
            status, 
            lead, 
            lead_name, 
            remediation, 
            skills: skills.map( row=> row.skill ), 
            associates: associates.map( row=> row.associate )
        })
       console.log(response)
	})
}

const getApi_users = (setState)=> {
    fetch( url + '/users' )
	.then( response=> response.json() )
	.then( response=> {
		setState({
            users: response.map( row=> row.username )
        })
	})
}

class ProjectFormModal extends React.Component {
    state = { 
        visible: false,
        project: '',
        status: 'Draft',
        lead: '',
        skills: [],
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

    inputItemEvent = key=> {
        return e=> {
            console.log(e)
            this.setState({
                [key]: e.target.value
            })
        }
    }
    inputItem = key=> {
        return value=> {
            console.log(value)
            this.setState({
                [key]: value
            })
        }
    }


    render() {
        console.log(this.state)
        return (
            <Modal title="Project" visible={true} onOk={this.handleOk} onCancel={this.handleCancel}>
                <Form className = "project">
                    <FormItem label = "Project Name">
                        <Input value={this.state.project} placeholder = "Project Name" onChange={ this.inputItemEvent('project') }/>
                    </FormItem>

                    <FormItem label = "Status">
                        <Select showSearch value={this.state.status} onChange={this.inputItem('status')}>
                            <Option value = "Draft">Draft</Option>
                            <Option value = "Pending">Pending Review</Option>
                            <Option value = "Approved">Approved</Option>
                            <Option value = "Cancelled">Cancelled</Option>
                        </Select>
                    </FormItem>

                    <FormItem label = "Lead">
                        <Select showSearch value={this.state.lead} onChange={this.inputItem('lead')}>
                            <Option value = "AaronTBridgers@gmail.com">Aaron Bridgers</Option>
                            <Option value = "chris_Kennedy@kenan-flagler.unc.edu">Chris Kennedy</Option>
                            <Option value = "danstahl1138@gmail.com">Daniel Stahl</Option>
                            <Option value = "thomasnguyen704@gmail.com">Thomas Nguyen</Option>
                        </Select>
                    </FormItem>

                    <FormItem label = "Skill Requirements">
                        <Select 
                            mode = "multiple" 
                            placeholder = "Skills Requirements" 
                            value={this.state.skills}
                            onChange={this.inputItem('skills')}
                        >
                            {
                                this.state.skills.map( (skill)=>{
                                    return ( <Option value={skill} key={skill}> {skill} </Option> )
                                })
                            }
                        </Select>
                    </FormItem>

                    <FormItem label = "Associates">
                        <Select 
                            showSearch 
                            mode = 'multiple'
                            value= { this.state.associates } // load only checked associates
                            onChange={this.inputItem('associates')}
                        >
                            {
                                this.state.users.map( (username)=>{ // load all associates
                                    return ( <Option value={username} key={username}> {username} </Option> )
                                })
                            }
                        </Select>
                    </FormItem>

                    <FormItem label = "Skill Gap">
                        <Input disabled placeholder = "Based on entries by associates skills survey" value={this.state.skillGap} onChange={this.inputItem('skillGap')}/>
                    </FormItem>

                    <FormItem label = "Remediation">
                        <Select showSearch mode = "multiple" value={this.state.remediation} onChange={this.inputItem('remediation')}>
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