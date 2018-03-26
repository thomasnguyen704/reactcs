import React from 'react'
import { VictoryBar, VictoryPie, VictoryChart, VictoryAxis } from 'victory'
import { Row, Col } from 'react-flexbox-grid'
import {url} from './utils'

const tickStyles = { fontSize: 12, fontFamily: 'Open Sans' }
const dataStyles = { fill: 'yellowGreen', opacity: 0.7, stroke: 'yellowGreen' }
const chartStyles = { border: 'solid thin whitesmoke', padding: '50px 0 50px 0', margin: '10px 0 10px 0', height: '95%' }

const getApi = (setState)=> {
    fetch( url + '/charts/active_lead' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data: response })
	})
}
const getApi2 = (setState)=> {
    fetch( url + '/charts/active_status' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data2: response })
	})
}

class ProjectsCharts extends React.Component {
	componentWillMount(){
        getApi(this.setState.bind(this))
        getApi2(this.setState.bind(this))
    }

    state = { data: [], data2: [] }
    
    render() {
        return (
            <div>
                <Row>
                    <h1>Measures</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
            </div>
        )
    }
}

export default ProjectsCharts