import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Divider } from 'antd'

class Home extends React.Component {
    render(){
        return(
            <div>
                <Row>
                    <Col md={12} lg={4}>
                        <h1>Human Capital Analytics</h1>
                        <p> Hello. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Col>
                    <Col md={12} lg={8}>
                        <iframe
                            title='Blog 3'
                            src='https://www.youtube.com/embed/F085WwMIWgM?showinfo=0'
                            frameBorder='0'
                            allowFullScreen
                            style={{ width: '100%', minHeight: '405px' }}
                        />
                    </Col>
                </Row>
                <Divider />
            </div>
        )
    }
}
export default Home