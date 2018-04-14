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
                        <p> 
                            The process of documenting the linkage between projects and human talent within banks has become more important over the past few years. Regulators and Federal examiners are becoming more critical of how groups whom provide oversight at a bank, such as risk management and audit, are ensuring that their groups have the necessary level of talent to execute on their body of work.
                        </p>
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