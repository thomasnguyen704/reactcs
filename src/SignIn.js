import React from 'react'
//import { Row, Col } from 'react-flexbox-grid'
import { Row, Col } from 'antd'

class SignIn extends React.Component {
    render(){
        return(
            <Row type='flex' justify='space-around' align='middle'>
                <Col span={16}>
                    <h1>Human Capital Analytics</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Col>
            </Row>
        )
    }
}
export default SignIn