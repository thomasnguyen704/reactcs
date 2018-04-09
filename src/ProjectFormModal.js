import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
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

const postApi_project = (data)=> {
    fetch ( 
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

const updateApi_project = (setState, id, data)=> {
	fetch( 
        url + '/update_project/' + id,
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
        remediation: '',
        users: []
    }
    
    submit = ()=> {
        postApi_project(this.state)
        this.props.history.goBack()
        message.info('Form Submitted.')
    }

    submitUpdate = ()=> {
        updateApi_project(this.state)
        this.props.history.goBack()
    }

    handleCancel = e=> { 
        this.props.history.goBack()
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
            <Modal 
                title="Project" 
                visible={true} 
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
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
                            mode = "tags" 
                            placeholder = "Skills Requirements" 
                            value={this.state.skills}
                            onChange={this.inputItem('skills')}
                        >
                            { children }
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
                        <Select 
                            value={this.state.remediation} 
                            onChange={this.inputItem('remediation')}
                        >
                            <Option value = "Training">Training</Option>
                            <Option value = "In Source">In Source</Option>
                            <Option value = "Out Source">Out Source</Option>
                        </Select>
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}
export default ProjectFormModal