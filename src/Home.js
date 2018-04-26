import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Divider, Icon } from 'antd'

// Styles
const moreMarginStart = { margin: '0 0 10rem 0' }
const moreMargin = { margin: '10rem 0 10rem 0' }
const subheader = { color: 'yellowgreen', fontWeight: '100', fontSize: '2.5em', textAlign:'center', marginBottom: '30px' }
const largeIcon = { fontSize: '5em', marginBottom: '20px' }

class Home extends React.Component {
    render(){
        return(
            <div>
                <Row className='jumbo'>
                    <Col md={12}>
                        <h1 style={subheader}>Human Capital Requirements Tracker</h1>
                        <h2>The purpose of this application is to document the linkage between human talent to project requirements as specified by regulation. A real world example are banks whom are required to have competencies around financial models and oversight functions. Additionally, the application will help identify gaps in talent that may need to be addressed by training, outsourcing, or hiring.</h2>
                    </Col>
                </Row>

                <Divider style={moreMarginStart}/>

                <h1 style={subheader}>A Vision For Associate Engagement<br/><br/></h1>
                <Row>
                    <Col md={12} lg={4}>
                        <h2>Hear industry thought leaders, Aaron Bridgers and Daniel Stahl, comment how this application can help enable their vision around promoting associate engagement, maximizing existing human talent, and addressing regulatory concerns around projects and skills.</h2>
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
                
                <Divider style={moreMargin}/>

                <h1 style={subheader}>How it Works<br/><br/></h1>
                <div style={{textAlign: 'center'}}>
                    <Row>
                        <Col md={12} lg={4}>
                            <Icon type='rocket' style={largeIcon}/>
                            <h3>Project Requirements</h3>
                            <h2>Project leads generate project requirements by assigning team members (associates) and skills to projects.</h2>
                        </Col>
                        <Col md={12} lg={4}>
                            <Icon type='user' style={largeIcon}/>
                            <h3>Survey Skills</h3>
                            <h2>Associates complete a survey indicating if he or she has the skill as specified during project requirement generation.</h2>
                        </Col>
                        <Col md={12} lg={4}>
                            <Icon type='link' style={largeIcon}/>
                            <h3>Track Remediation</h3>
                            <h2>Gaps are determined by comparing requirements to survey results and then tracked for regulatory purposes.</h2>
                        </Col>
                    </Row>
                </div>
                
                <Divider style={moreMargin}/>

            </div>
        )
    }
}
export default Home