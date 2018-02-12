import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col } from 'react-flexbox-grid'; 

const tickStyles = {
    fontSize: 10,
    fontFamily: 'Open Sans'
}
const dataStyles = {
    fill: 'yellowGreen',
    opacity: 0.7,
    stroke: 'yellowGreen'
}

const data = [
    {associate: 'Aaron Bridgers', earnings: 13000},
    {associate: 'Chris Kennedy', earnings: 16500},
    {associate: 'Daniel Stahl', earnings: 14250},
    {associate: 'Thomas Nguyen', earnings: 19000}
];

class ProjectsCharts extends React.Component {
    render() {
        return (
            <div style={{marginTop: '100px'}}>
                <Row>
                    <Col lg={6}>
                        <p className='chartTitle'>Some Bar Chart</p>
                        <VictoryChart 
                            domainPadding={50}
                        >
                            <VictoryAxis
                                style={{ tickLabels: tickStyles }}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => (`$${x / 1000}k`)}  // tickFormat specifies how ticks should be displayed
                                style={{ tickLabels: tickStyles, data: dataStyles }}
                            />
                            <VictoryBar  
                                data={data} 
                                x='associate' 
                                y='earnings'
                                style={{
                                    data: dataStyles,
                                    labels: {fontSize: 10}
                                  }}
                            />
                        </VictoryChart>
                    </Col>
                    <Col lg={6}>
                        <p className='chartTitle'>Some Line Chart</p>
                        <VictoryChart 
                            domainPadding={50} >
                            <VictoryAxis
                                //tickValues={[1, 2, 3, 4]}  // tickValues specifies both the number of ticks and where, they are placed on the axis
                                //tickFormat={['Associate 1', 'Associate 2', 'Associate 3', 'Associate 4']}
                                style={{ tickLabels: tickStyles }}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => (`$${x / 1000}k`)}  // tickFormat specifies how ticks should be displayed
                                style={{ tickLabels: tickStyles, data: dataStyles }}
                            />
                            <VictoryLine 
                                data={data} 
                                x='associate' 
                                y='earnings' 
                            />
                        </VictoryChart>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProjectsCharts