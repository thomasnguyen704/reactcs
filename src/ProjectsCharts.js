import React from 'react'
import { Table, Divider } from 'antd'
import { VictoryBar, VictoryPie, VictoryChart, VictoryAxis } from 'victory'
import { Row, Col } from 'react-flexbox-grid'
import {url} from './utils'

const sectionHeader = { margin:'50px 0 25px 0', fontSize: '1.7em', fontWeight: '200'}
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
const columnsStatus = [
    { 
        title: 'Project', 
        dataIndex: 'Project',
        sorter: (a, b)=> {
            var nameA = a.Project.toUpperCase()
            var nameB = b.Project.toUpperCase()
            if (nameA < nameB) { return -1 }
            if (nameA > nameB) { return 1 }
            return 0
        }
    },
    { 
        title: 'Status', 
        dataIndex: 'Status',
        sorter: (a, b)=> {
            var nameA = a.Status.toUpperCase()
            var nameB = b.Status.toUpperCase()
            if (nameA < nameB) { return -1 }
            if (nameA > nameB) { return 1 }
            return 0
        }
    }
]
const columnsGap = [
    { 
        title: 'Project', 
        dataIndex: 'Project',
        sorter: (a, b)=> {
            var nameA = a.Project.toUpperCase()
            var nameB = b.Project.toUpperCase()
            if (nameA < nameB) { return -1 }
            if (nameA > nameB) { return 1 }
            return 0
        }
    },
    { 
        title: 'Skill Gap', 
        dataIndex: 'SkillGap', 
        sorter: (a, b)=> a.SkillGap.length - b.SkillGap.length 
    }
]
const columnsReq = [
    { 
        title: 'Skill', 
        dataIndex: 'Skill',
        sorter: (a, b)=> {
            var nameA = a.Skill.toUpperCase()
            var nameB = b.Skill.toUpperCase()
            if (nameA < nameB) { return -1 }
            if (nameA > nameB) { return 1 }
            return 0
        }
    },
    { 
        title: 'Count', 
        dataIndex: 'Count', 
        sorter: (a, b)=> a.Count - b.Count 
    }
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
                <div className='jumboSmall'>
                    <h1>Managerial and Regulatory Reporting</h1>
                    <h2>Reporting should provide an overall view of operational and regulatory metrics. Operational metrics focuses on drill down measures while regulatory metrics focuses on overall results. </h2>
                </div>

                <p style={sectionHeader}>Project Submissions</p>
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

                <p style={sectionHeader}>Gap Results</p>
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
                                colorScale={[ 'gainsboro', 'yellowgreen' ]}
                                style={{ labels: tickStyles }}
                                animate={{ duration: 2000, onLoad: { duration: 1000 } }}
                                width={500}
                            />
                        </div>
                    </Col>
                </Row>

                <p style={sectionHeader}>Skill Requirements Overview</p>
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