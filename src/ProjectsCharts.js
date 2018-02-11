import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col } from 'react-flexbox-grid'; 

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
];

class ProjectsCharts extends React.Component {
    render() {
        return (
            <div style={{marginTop: '100px'}}>
                <Row>
                    <Col lg={6}>
                        <h3 className='chartTitle'>Some Bar Chart</h3>
                        <VictoryChart
                            domainPadding={20} // domainPadding will add space to each side of VictoryBar to prevent it from overlapping the axis
                        >
                            <VictoryAxis
                                tickValues={[1, 2, 3, 4]}  // tickValues specifies both the number of ticks and where, they are placed on the axis
                                tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
                                style={{ tickLabels: {fontSize: 8} }}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => (`$${x / 1000}k`)}  // tickFormat specifies how ticks should be displayed
                                style={{ tickLabels: {fontSize: 8} }}
                            />
                            <VictoryBar
                                data={data}
                                x='quarter'
                                y='earnings'
                            />
                        </VictoryChart>
                    </Col>
                    <Col lg={6}>
                        <h3 className='chartTitle'>Some Line Chart</h3>
                        <VictoryChart
                            domainPadding={20} // domainPadding will add space to each side of VictoryBar to prevent it from overlapping the axis
                        >
                            <VictoryAxis
                                tickValues={[1, 2, 3, 4]}  // tickValues specifies both the number of ticks and where, they are placed on the axis
                                tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
                                style={{ tickLabels: {fontSize: 8} }}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => (`$${x / 1000}k`)}  // tickFormat specifies how ticks should be displayed
                                style={{ tickLabels: {fontSize: 8} }}
                            />
                            <VictoryLine
                                data={data}
                                x='quarter'
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