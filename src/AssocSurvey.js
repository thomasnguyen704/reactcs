import React from 'react'
import { Tag } from 'antd'
import { Row, Col } from 'react-flexbox-grid'
import { url } from './utils'

const selectStyles = { border: 'solid thin whitesmoke', padding: '50px', margin: '10px 0 10px 0', height: '95%' }
const tag = { border: 'thin solid whitesmoke', margin: 5 }

const getApi = (setState, user)=> {
	fetch( url + '/surveys/' + user )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data: response })
	})
}

const { CheckableTag } = Tag

class ClickTag extends React.Component {    
    state = { checked: this.props.checked }
    handleChange = checked=> { this.setState({ checked }) }
    render() {
        return ( <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} /> )
    }
}

class SelectTags extends React.Component{
    state = {
        data: []
    }
	componentWillMount(){
		getApi( this.setState.bind(this), this.props.googleToken.profileObj.email )
	}
    render(){
        return(
            <div>
                <Row>
                    <Col md={12} lg={6}>
                        <h1>Skills Survey for {this.props.googleToken.profileObj.name}</h1>
                        <p>Select a skill to designate yourself as skillfull in it.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Col>
                    <Col md={12} lg={6}>
                        <div style = {selectStyles}>
                            {
                                this.state.data.map( (row)=>{
                                    return ( <ClickTag key={row.skill_id} style={tag} checked={row.skill_exist}> {row.skill} </ClickTag> )
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