import React from 'react'
import { Row, Col } from 'antd'

class SignIn extends React.Component {
    render(){
        return(
            <Row type='flex' justify='space-around' align='middle'>
                <Col sm={24} lg={18}>
                    <h1 className='brightLarge'>Human Capital Requirements Tracker</h1>
                    <p className='brightSmall'>
                        The purpose of this application is to document the linkage between human talent to project requirements as specified by regulation. A real world example are banks whom are required to have competencies around financial models and oversight functions. Additionally, the application will help identify gaps in talent that may need to be addressed by training, outsourcing, or hiring.
                    </p>
                </Col>
            </Row>
        )
    }
}
export default SignIn