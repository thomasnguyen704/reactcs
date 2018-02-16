import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryPie, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col } from 'react-flexbox-grid'; 

const tickStyles = {
    fontSize: 12,
    fontFamily: 'Open Sans'
}
const dataStyles = {
    fill: 'yellowGreen',
    opacity: 0.7,
    stroke: 'yellowGreen'
}

const assignments = [
    {associate: 'Aaron Bridgers', assigned: 2},
    {associate: 'Chris Kennedy', assigned: 3},
    {associate: 'Daniel Stahl', assigned: 5},
    {associate: 'Thomas Nguyen', assigned: 1}
]
const statuses = [
    {status: 'Draft', count: 3},
    {status: 'Pending', count: 2},
    {status: 'Approved', count: 5},
    {status: 'Cancelled', count: 1}
]

class ProjectsCharts extends React.Component {
    render() {
        return (
            <div style={{marginTop: '100px'}}>
                <Row>
                    <h1>Measures</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <Col lg={6}>
                        <div style={{ height: '75%', border: 'solid thin whitesmoke', padding: '50px 0 50px 0' }}>
                            <p className='chartTitle'>Active Assignments</p>
                            <VictoryChart domainPadding={{ y: 15 }}>
                                <VictoryAxis
                                    dependentAxis
                                    style={{ tickLabels: tickStyles, data: dataStyles}}
                                />
                                <VictoryBar  
                                    data={assignments} 
                                    x='associate' 
                                    y='assigned'
                                    horizontal
                                    labels={ (d)=> d.y }
                                    style={{ data: dataStyles, labels: tickStyles }}
                                />
                            </VictoryChart>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div style={{ height: '75%', border: 'solid thin whitesmoke', padding: '50px 0 50px 0' }}>
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
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProjectsCharts