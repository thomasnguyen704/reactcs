import React from 'react'
import { VictoryBar, VictoryPie, VictoryChart, VictoryAxis } from 'victory'
import { Row, Col } from 'react-flexbox-grid'

const url = process.env.production? '159.65.189.161:3001' : ''

const tickStyles = {
    fontSize: 12,
    fontFamily: 'Open Sans'
}
const dataStyles = {
    fill: 'yellowGreen',
    opacity: 0.7,
    stroke: 'yellowGreen'
}
const chartStyles = {
    border: 'solid thin whitesmoke', 
    padding: '50px 0 50px 0', 
    margin: '10px 0 10px 0',
    height: '95%'
}
/*
const assignments = [
    {associate: 'Aaron Bridgers', assigned: 2},
    {associate: 'Chris Kennedy', assigned: 3},
    {associate: 'Daniel Stahl', assigned: 5},
    {associate: 'Thomas Nguyen', assigned: 1}
]
*/
const statuses = [
    {status: 'Draft', count: 3},
    {status: 'Pending', count: 2},
    {status: 'Approved', count: 5},
    {status: 'Cancelled', count: 1}
]

const getApi = (setState)=> {
	fetch( url + '/chartActiveLead' )
	.then( response=> response.json() )
	.then( response=> {
		setState({ data: response })
	})
}

class ProjectsCharts extends React.Component {
	componentWillMount(){
		getApi(this.setState.bind(this))
    }

    state = {
        data: []
    }
    
    render() {
        console.log(this.state)
        return (
            <div>
                <Row>
                    <h1>Measures</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <Col lg={6}>
                        <div style={chartStyles}>
                            <p className='chartTitle'>Active Assignments</p>
                            <VictoryChart 
                                domainPadding={20}
                            >
                                <VictoryAxis
                                    style={{ 
                                        tickLabels: tickStyles, 
                                        data: dataStyles
                                    }}
                                />
                                <VictoryBar  
                                    data={this.state.data} 
                                    x='lead' 
                                    y='assigned'
                                    labels={ (d)=> d.y }
                                    style={{ data: dataStyles, labels: tickStyles }}
                                />
                            </VictoryChart>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div style={chartStyles}>
                            <p className='chartTitle'>Entry Status</p>
                            <VictoryPie 
                                data={statuses} 
                                x='status' 
                                y='count'
                                labels={ (d) => `${d.x}: ${d.y}` }
                                innerRadius={100}
                                padAngle={3}
                                colorScale={[ 'tomato', 'orange', 'gold', 'cyan', 'navy' ]}
                                style={{ labels: tickStyles }}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
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