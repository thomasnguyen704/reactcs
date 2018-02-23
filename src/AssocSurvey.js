import React from 'react'
import { Tag } from 'antd'
import { Row, Col } from 'react-flexbox-grid'

const selectStyles = {
    border: 'solid thin whitesmoke', 
    padding: '50px', 
    margin: '10px 0 10px 0',
    height: '95%'
}
const tag = {
    border: 'thin solid whitesmoke',
    margin: 5
}
const { CheckableTag } = Tag
const assocName = 'Thomas Nguyen'

class ClickTag extends React.Component {
    state = {  checked: false  }
    handleChange = (checked) => { this.setState({ checked }) }
    render() {
        return (
            <CheckableTag 
                {...this.props} 
                checked={this.state.checked} 
                onChange={this.handleChange}
            />
        )
    }
}

class SelectTags extends React.Component{
    render(){
        return(
            <div>
                <Row>
                    <Col md={6}>
                        <h1>Skills Survey for {assocName}</h1>
                        <p>Select a skill to designate yourself as skillfull in it.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Col>
                    <Col md={6}>
                        <div style = {selectStyles}>
                            <ClickTag style = {tag}>Skill</ClickTag>
                            <ClickTag style = {tag}>Another skill</ClickTag>
                            <ClickTag style = {tag}>One more skill</ClickTag>
                            <ClickTag style = {tag}>How about another skill</ClickTag>
                            <ClickTag style = {tag}>And another skill</ClickTag>
                            <ClickTag style = {tag}>KYC</ClickTag>
                            <ClickTag style = {tag}>BSA/AML</ClickTag>
                            <ClickTag style = {tag}>Oracle SQL</ClickTag>
                            <ClickTag style = {tag}>MS SQL</ClickTag>
                            <ClickTag style = {tag}>Mainframe</ClickTag>
                            <ClickTag style = {tag}>SAS</ClickTag>
                            <ClickTag style = {tag}>CECL</ClickTag>
                            <ClickTag style = {tag}>Some math</ClickTag>
                            <ClickTag style = {tag} >More math stuff</ClickTag>
                            <ClickTag style = {tag}>Skill</ClickTag>
                            <ClickTag style = {tag}>Another skill</ClickTag>
                            <ClickTag style = {tag}>One more skill</ClickTag>
                            <ClickTag style = {tag}>How about another skill</ClickTag>
                            <ClickTag style = {tag}>And another skill</ClickTag>
                            <ClickTag style = {tag}>KYC</ClickTag>
                            <ClickTag style = {tag}>BSA/AML</ClickTag>
                            <ClickTag style = {tag}>Oracle SQL</ClickTag>
                            <ClickTag style = {tag}>MS SQL</ClickTag>
                            <ClickTag style = {tag}>Mainframe</ClickTag>
                            <ClickTag style = {tag}>SAS</ClickTag>
                            <ClickTag style = {tag}>CECL</ClickTag>
                            <ClickTag style = {tag}>Some math</ClickTag>
                            <ClickTag style = {tag} >More math stuff</ClickTag>
                            <ClickTag style = {tag}>Skill</ClickTag>
                            <ClickTag style = {tag}>Another skill</ClickTag>
                            <ClickTag style = {tag}>One more skill</ClickTag>
                            <ClickTag style = {tag}>How about another skill</ClickTag>
                            <ClickTag style = {tag}>And another skill</ClickTag>
                            <ClickTag style = {tag}>KYC</ClickTag>
                            <ClickTag style = {tag}>BSA/AML</ClickTag>
                            <ClickTag style = {tag}>Oracle SQL</ClickTag>
                            <ClickTag style = {tag}>MS SQL</ClickTag>
                            <ClickTag style = {tag}>Mainframe</ClickTag>
                            <ClickTag style = {tag}>SAS</ClickTag>
                            <ClickTag style = {tag}>CECL</ClickTag>
                            <ClickTag style = {tag}>Some math</ClickTag>
                            <ClickTag style = {tag} >More math stuff</ClickTag>
                            <ClickTag style = {tag}>Skill</ClickTag>
                            <ClickTag style = {tag}>Another skill</ClickTag>
                            <ClickTag style = {tag}>One more skill</ClickTag>
                            <ClickTag style = {tag}>How about another skill</ClickTag>
                            <ClickTag style = {tag}>And another skill</ClickTag>
                            <ClickTag style = {tag}>KYC</ClickTag>
                            <ClickTag style = {tag}>BSA/AML</ClickTag>
                            <ClickTag style = {tag}>Oracle SQL</ClickTag>
                            <ClickTag style = {tag}>MS SQL</ClickTag>
                            <ClickTag style = {tag}>Mainframe</ClickTag>
                            <ClickTag style = {tag}>SAS</ClickTag>
                            <ClickTag style = {tag}>CECL</ClickTag>
                            <ClickTag style = {tag}>Some math</ClickTag>
                            <ClickTag style = {tag} >More math stuff</ClickTag>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SelectTags