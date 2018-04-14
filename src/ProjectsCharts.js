import React from 'react'
import { Tabs } from 'antd'
import { VictoryBar, VictoryPie, VictoryChart, VictoryAxis } from 'victory'
import { Row, Col } from 'react-flexbox-grid'
import {url} from './utils'

const tickStyles = { fontSize: 12, fontFamily: 'Open Sans' }
const dataStyles = { fill: 'yellowGreen', opacity: 0.7, stroke: 'yellowGreen' }
const chartStyles = { border: 'solid thin whitesmoke', padding: '50px 0 50px 0', margin: '10px 0 10px 0', height: '95%' }

const TabPane = Tabs.TabPane

const get_activeLead = (setState)=> {
    fetch( url + '/charts/active_lead' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data: response })
	})
}
const get_activeStatus = (setState)=> {
    fetch( url + '/charts/active_status' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data2: response })
	})
}

class ProjectsCharts extends React.Component {
	componentWillMount(){
        get_activeLead(this.setState.bind(this))
        get_activeStatus(this.setState.bind(this))
    }
    state = { 
        data: [], 
        data2: [] 
    }
    render() {
        return (
            <div>
                <h1>Reports</h1>
                <p>Managerial reporting is a display an overall view of results for projects and skill gaps remediations by Lead/Manager. Reporting should provide an overview for managerial and regulatory oversight purposes.</p>
                <Tabs defaultActiveKey='1' tabPosition='left'>
                    <TabPane tab='Managerial' key='1'>
                        <Row>
                            <Col lg={6}>
                                <div style={chartStyles}>
                                    <p className='chartTitle'>Active Assignments by Lead</p>
                                    <VictoryChart domainPadding={20} >
                                        <VictoryAxis style={{ tickLabels: tickStyles, data: dataStyles }} />
                                        <VictoryBar  
                                            data={this.state.data} 
                                            x='username' 
                                            y='assigned'
                                            labels={ (d)=> d.y }
                                            style={{ data: dataStyles, labels: tickStyles }}
                                        />
                                    </VictoryChart>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div style={chartStyles}>
                                    <p className='chartTitle'>Active Assignments by Lead</p>
                                    <VictoryChart domainPadding={20} >
                                        <VictoryAxis style={{ tickLabels: tickStyles, data: dataStyles }} />
                                        <VictoryBar  
                                            data={this.state.data} 
                                            x='username' 
                                            y='assigned'
                                            labels={ (d)=> d.y }
                                            style={{ data: dataStyles, labels: tickStyles }}
                                        />
                                    </VictoryChart>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab='Regulatory' key='2'>
                        <Row>
                            <Col lg={6}>
                            <div style={chartStyles}>
                                    <p className='chartTitle'>Status of Open Items</p>
                                    <VictoryPie 
                                        data={this.state.data2} 
                                        x='status' 
                                        y='count'
                                        labels={ (d) => `${d.x}: ${d.y}` }
                                        innerRadius={100}
                                        padAngle={3}
                                        colorScale={[ 'tomato', 'orange', 'gold', 'cyan', 'navy' ]}
                                        style={{ labels: tickStyles }}
                                        animate={{ duration: 2000, onLoad: { duration: 1000 } }}
                                        width={500}
                                    />
                                </div>
                            </Col>
                            <Col lg={6}>
                            <div style={chartStyles}>
                                    <p className='chartTitle'>Status of Open Items</p>
                                    <VictoryPie 
                                        data={this.state.data2} 
                                        x='status' 
                                        y='count'
                                        labels={ (d) => `${d.x}: ${d.y}` }
                                        innerRadius={100}
                                        padAngle={3}
                                        colorScale={[ 'tomato', 'orange', 'gold', 'cyan', 'navy' ]}
                                        style={{ labels: tickStyles }}
                                        animate={{ duration: 2000, onLoad: { duration: 1000 } }}
                                        width={500}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default ProjectsCharts