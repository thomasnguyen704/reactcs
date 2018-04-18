import React from 'react'
import { Table, Divider } from 'antd'
import { VictoryBar, VictoryPie, VictoryChart, VictoryAxis } from 'victory'
import { Row, Col } from 'react-flexbox-grid'
import {url} from './utils'

const sectionHeader = { marginTop: '50px', fontSize: '1.7em', fontWeight: '200'}
const tickStyles = { fontSize: 12, fontFamily: 'Open Sans' }
const dataStyles = { fill: 'yellowGreen', opacity: 0.7, stroke: 'yellowGreen' }
const chartStyles = { border: 'solid thin whitesmoke', padding: '50px 0 50px 0', margin: '10px 0 10px 0', height: '95%' }
const tableStyles = { border: 'solid thin whitesmoke', padding: '50px', margin: '10px 0 10px 0', height: '95%' }

// APIs to get data
const get_activeLead = (setState)=> {
    fetch( url + '/charts/active_lead' )
	.then( response=> response.json() )
	.then( response=> { setState({ data: response }) })
}
const get_projectStatus = (setState)=> {
    fetch( url + '/charts/projectStatus' )
	.then( response=> response.json() )
	.then( response=> { setState({ projectStatusData: response }) })
}
const get_countProjectStatus = (setState)=> {
    fetch( url + '/charts/count_projectStatus' )
	.then( response=> response.json() )
	.then( response=> { setState({ countProjectStatusData: response }) })
}
const get_projectGaps = (setState)=> {
    fetch( url + '/charts/project_gaps' )
	.then( response=> response.json() )
	.then( response=> { setState({ projectGapsData: response }) })
}
const get_countGaps = (setState)=> {
    fetch( url + '/charts/count_gaps' )
	.then( response=> response.json() )
	.then( response=> { setState({ countGapsData: response }) })
}
const get_countReq = (setState)=> {
    fetch( url + '/charts/count_req' )
	.then( response=> response.json() )
	.then( response=> { setState({ countReqData: response }) })
}
const get_countSkills = (setState)=> {
    fetch( url + '/charts/count_skills' )
	.then( response=> response.json() )
	.then( response=> { setState({ countSkillsData: response }) })
}

// columns for tables
const columnsGap = [
    { title: 'Project', dataIndex: 'Project' },
    { title: 'Skill Gap', dataIndex: 'Skill Gap' }
]
const columnsStatus = [
    { title: 'Project', dataIndex: 'Project' },
    { title: 'Status', dataIndex: 'Status' }
]
const columnsReq = [
    { title: 'Skill', dataIndex: 'Skill' },
    { title: 'Count', dataIndex: 'Count' }
]

class ProjectsCharts extends React.Component {
	componentWillMount(){
        get_activeLead(this.setState.bind(this))
        get_projectStatus(this.setState.bind(this))
        get_countProjectStatus(this.setState.bind(this))
        get_projectGaps(this.setState.bind(this))
        get_countGaps(this.setState.bind(this))
        get_countReq(this.setState.bind(this))
        get_countSkills(this.setState.bind(this))
    }
    state = { 
        data: [], 
        projectStatusData: [],
        countProjectStatusData: [],
        projectGapsData: [],
        countGapsData: [],
        countReqData: [],
        countSkillsData: []
    }
    render() {
        return (
            <div>
                <h1>Managerial and Regulatory Reporting</h1>
                <p>Managerial reporting is a display an overall view of results for projects and skill gaps remediations by Lead/Manager. Reporting should provide an overview for managerial and regulatory oversight purposes.</p>
                <br/>

                <p style={sectionHeader}>Project Requirement Submissions</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <Divider />
                <Row>
                    <Col lg={6}>
                        <div style={tableStyles}>
                            <p className='chartTitle'>Project Status</p>
                            <Table 
                                dataSource={this.state.projectStatusData} 
                                columns={columnsStatus} 
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div style={chartStyles}>
                            <p className='chartTitle'>Count Projects by Status</p>
                            <VictoryChart domainPadding={20} >
                                <VictoryAxis style={{ tickLabels: tickStyles, data: dataStyles }} />
                                <VictoryBar  
                                data={this.state.countProjectStatusData} 
                                x='Status' 
                                y='Projects'
                                labels={ (d)=> d.y }
                                style={{ data: dataStyles, labels: tickStyles }}
                                />
                            </VictoryChart>
                        </div>
                    </Col>
                </Row>

                <p style={sectionHeader}>Project Gap Results</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <Divider />
                <Row>
                    <Col lg={6}>
                        <div style={tableStyles}>
                            <p className='chartTitle'>Project Gap Results</p>
                            <Table 
                                dataSource={this.state.projectGapsData} 
                                columns={columnsGap} 
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                    <div style={chartStyles}>
                            <p className='chartTitle'>Count of Gaps by Project</p>
                            <VictoryPie 
                                data={this.state.countGapsData} 
                                x='Skill Gap' 
                                y='# Projects'
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

                <p style={sectionHeader}>Skill Reqiurements Overview</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <Divider />
                <Row>
                    <Col lg={6}>
                    <div style={tableStyles}>
                            <p className='chartTitle'>Count of Requirements by Skill</p>
                            <Table 
                                dataSource={this.state.countReqData} 
                                columns={columnsReq} 
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div style={tableStyles}>
                            <p className='chartTitle'>Count of Surveys True by Skill</p>
                            <Table 
                                dataSource={this.state.countSkillsData} 
                                columns={columnsReq} 
                                pagination={{ pageSize: 5 }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProjectsCharts