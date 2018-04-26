import React from 'react'
import { Modal, Form, Input, Select, message, Button } from 'antd'
import { url }  from './utils'

const FormItem = Form.Item
const Option = Select.Option
let children = []

// Read Users
const getApi_users = (setState)=> {
    fetch( url + '/users' )
	.then( response=> response.json() )
	.then( response=> {
		setState({
            users: response.map( row=> row.username )
        })
	})
}
// Create Projects
const postApi_project = (data)=> {
    return fetch ( 
        url + '/create_project',
        {
            method: 'post',
            body: JSON.stringify(data),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'user-agent': 'Mozilla/4.0 MDN Example',
              'content-type': 'application/json'
            }
        }
    )
    .then( response=> response.json() )
}
// Read Projects
const getApi_project = (setState, id)=> {
	fetch( url + '/projects/' + id )
	.then( response=> response.json() )
	.then( response=> {
        const { project, status, lead, lead_name, remediation, skills, skillGap, associates } = response
        setState({ 
            project, 
            status, 
            lead, 
            lead_name, 
            remediation, 
            skills: skills.map( row=> row.skill ), 
            skillGap: skillGap.length>0? skillGap[0].skillGap: '',
            associates: associates.map( row=> row.associate )
        })
	})
}

class ProjectFormModal extends React.Component {
    // set initial state
    state = { 
        visible: false,
        project: '',
        status: 'Draft',
        lead: '',
        skills: [],
        associates: [],
        skillGap: '',
        remediation: '',
        users: []
    }

    submit = (event)=> {
        if(this.state.project === ''){
            event.preventDefault()
            message.error('Provide a Project')
        }
        if (this.state.lead === '') {
            event.preventDefault()
            message.error('Provide a Lead')
        }
        else {
            const tempId = this.props.match.params.id
            const id = tempId? parseInt(tempId, 10) :null
            const {visible, ...rest} = this.state
            postApi_project({...rest, id}).then( ()=>{this.props.getProjects()})
            this.props.history.goBack()
            message.info('Form Submitted.')
        }
    }

    handleCancel = e=> {
        this.props.history.goBack()
    }

    // form input values
    inputItemEvent = key=> {
        return e=> {
            this.setState({
                [key]: e.target.value
            })
        }
    }
    inputItem = key=> {
        return value=> {
            this.setState({
                [key]: value
            })
        }
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

    render() {
        return (
            <Modal title='Project' visible={true} footer={null} onCancel={this.handleCancel} >                
                <Form className = 'project'>
                    <FormItem label = 'Type a project name'>
                        <Input value={this.state.project} placeholder = 'Project Name' onChange={ this.inputItemEvent('project')} />
                    </FormItem>
                    <FormItem label = 'Select a status'>
                        <Select showSearch value={this.state.status} onChange={this.inputItem('status')} >
                            <Option value = 'Draft'>Draft</Option>
                            <Option value = 'Pending'>Pending Review</Option>
                            <Option value = 'Complete'>Complete</Option>
                            <Option value = 'Cancelled'>Cancelled</Option>
                        </Select>
                    </FormItem>
                    <FormItem label = 'Lead'>
                        <Select showSearch value={this.state.lead} onChange={this.inputItem('lead')} >
                            <Option value='' disabled selected hidden>Select a project lead</Option>
                            <Option value = 'AaronTBridgers@gmail.com'>Aaron Bridgers</Option>
                            <Option value = 'chris_Kennedy@kenan-flagler.unc.edu'>Chris Kennedy</Option>
                            <Option value = 'danstahl1138@gmail.com'>Daniel Stahl</Option>
                            <Option value = 'thomasnguyen704@gmail.com'>Thomas Nguyen</Option>
                        </Select>
                    </FormItem>
                    <FormItem label='Skill Requirements' extra='Type a skill then hit return to type another.'>
                        <Select
                            mode = 'tags' 
                            placeholder = 'Enter a skill'
                            value={this.state.skills}
                            onChange={this.inputItem('skills')}
                        >
                            { children }
                        </Select>
                    </FormItem>
                    <FormItem label='Associates'>
                        <Select
                            showSearch 
                            mode='multiple'
                            value= { this.state.associates } // load only checked associates
                            onChange={this.inputItem('associates')}
                            placeholder='Select associates for the project.'
                        >
                            { 
                                this.state.users.map( (username)=>{ // load all associates
                                    return ( <Option value={username} key={username}> {username} </Option> )
                                })
                            }
                        </Select>
                    </FormItem>

                    <FormItem label='Skill Gap' extra='Please check if your associates have answered all surveys before determining that your project has a skill gap.'>
                        <Input disabled placeholder='Based on entries by associates skills survey' value={this.state.skillGap} onChange={this.inputItem('skillGap')} />
                    </FormItem>

                    <FormItem label='Remediation'>
                        <Select value={this.state.remediation} disabled={this.props.user !== 'AaronTBridgers@gmail.com'} onChange={this.inputItem('remediation')} >
                            <Option value ='' disabled selected hidden> Deputy selects a remediation method</Option>
                            <Option value = 'Training'>Training</Option>
                            <Option value = 'In Source'>In Source</Option>
                            <Option value = 'Out Source'>Out Source</Option>
                            <Option value = 'None'>None</Option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Button onClick={this.submit} type='primary'> Submit </Button>
                    </FormItem>
                </Form>

            </Modal>
        )
    }
}
export default ProjectFormModal