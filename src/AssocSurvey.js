import React from 'react'
import { Tag, notification, /*message*/ } from 'antd'
import { Row, Col } from 'react-flexbox-grid'
import { url } from './utils'

const selectStyles = { border: 'solid thin whitesmoke', padding: '50px', margin: '10px 0 10px 0', height: '95%' }
const tag = { border: 'solid thin lightgrey', margin: 5 }

const getApi = (setState, user)=> {
    fetch( url + '/surveys/' + user )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data: response })
	})
}

const postApi = (user, data)=> {
    return fetch( url + '/surveys/' + user,
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
    ).then( response=> response.json() )
}

const { CheckableTag } = Tag

class ClickTag extends React.Component {    
    state = { 
        checked: this.props.checked 
    }
    handleChange = checked=> { 
        this.setState({ checked })
        postApi(this.props.user, {project_skill: this.props.project_skill, checked})
        //message.info('Changes Saved.')
        notification.open({
            message: 'Changes Saved',
            description: 'Your skills survey selections have been saved. A blue button indicates that you have the skill. A clear button indicates that you do not have the skill. ',
        })
    }
    render() {
        return ( <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} /> )
    }
}

class SelectTags extends React.Component{
    state = {
        data: []
    }
	componentWillMount(){
        getApi( 
            this.setState.bind(this), 
            this.props.googleToken.profileObj.email 
        )
	}
    render(){
        return(
            <div>
                <h1 style={{marginTop: '2rem'}}>Skills Survey for {this.props.googleToken.profileObj.name}</h1>
                <Row>
                    <Col md={12} lg={5}>
                        <h2>Only click on a skill if you self-assess that you have the working ability of the skill surveyed.</h2>
                        <h2>The displayed skills do not represent your entire set of skills. These are only skills surveyed by project leads as when project requirements are developed. Please revisit this page often as new project requirements are often submitted.</h2>
                    </Col>
                    <Col md={12} lg={7}>
                        <div style = {selectStyles}>
                            {
                                this.state.data.map( (row)=>{
                                    return ( 
                                        <ClickTag 
                                            key={row.skill_id} 
                                            style={tag} 
                                            checked={row.skill_exist}
                                            project_skill={row.skill_id}
                                            user={this.props.googleToken.profileObj.email}
                                        > 
                                            {row.skill} 
                                        </ClickTag> 
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SelectTags