import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Divider, Card } from 'antd'

const cardStyles = {
    minHeight: '30vh',
    marginBottom: '25px'
}
const moreMarginStart = {
    margin: '0 0 10rem 0'
}
const moreMargin = {
    margin: '10rem 0 10rem 0'
}

class Home extends React.Component {
    render(){
        return(
            <div>
                <Row className='jumbo'>
                    <Col md={12}>
                        <h1 style={{color: 'dodgerblue', fontWeight: '100', fontSize: '3em'}}>Human Capital Requirements Tracker</h1>
                        <h2>The purpose of this application is to document the linkage between human talent to project requirements as specified by regulation. A real world example are banks whom are required to have competencies around financial models and oversight functions. Additionally, the application will help identify gaps in talent that may need to be addressed by training, outsourcing, or hiring.</h2>
                    </Col>
                </Row>

                <Divider style={moreMarginStart}/>

                <h1 style={{color: 'dodgerblue', fontWeight: '100', fontSize: '2em'}}>Vision</h1>
                <Row>
                    <Col md={12} lg={5}>
                        <h2>
                            Hear industry thought leaders, Aaron Bridgers and Daniel Stahl, comment how this application can help enable their vision around:
                            <br/><br/>
                            <ul>
                                <li>Promoting associate engagement</li>
                                <li>Maximizing existing human talent</li>
                                <li>Addressing regulatory concerns around projects and skills</li>
                            </ul>
                        </h2>
                    </Col>
                    <Col md={12} lg={7}>
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

                <h1 style={{color: 'dodgerblue', fontWeight: '100', fontSize: '2em'}}>How it Works</h1>
                <Row>
                    <Col md={12} lg={4}>
                        <Card style={cardStyles}>
                            <h2>Project Skill Requirements</h2>
                            <p>Project leads specify skill requirements by assigning team members (associates) to a project and indicating the skills required to complete a project.</p>
                        </Card>
                    </Col>
                    <Col md={12} lg={4}>
                        <Card style={cardStyles}>
                            <h2>Associate Skills</h2>
                            <p>Associates complete a survey indicating if he or she has the skill as specified by the project lead.</p>
                        </Card>
                    </Col>
                    <Col md={12} lg={4}>
                        <Card style={cardStyles}>
                            <h2>Skills Gap Remediation</h2>
                            <p>Gaps are determined by comparing requirements and survey results. Remediation of gaps are tracked and shared by all stakeholders.</p>
                        </Card>
                    </Col>
                </Row>
                
                <Divider style={moreMargin}/>

            </div>
        )
    }
}
export default Home