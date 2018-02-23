import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { Divider } from 'antd'
import { Grid, Row, Col } from 'react-flexbox-grid'
import TopNav from './Navbar'
import ProjectsTable from './ProjectsTable'
import ProjectsCharts from './ProjectsCharts'
import SelectTags from './AssocSurvey'

ReactDOM.render(
    <div className='container'>
        <TopNav />
        <Grid fluid>
            <Row>
                <Col lg={12}>
                    <ProjectsTable />
                    <Divider className = 'divider'/>
                    <ProjectsCharts />
                    <Divider className = 'divider'/>
                    <SelectTags />
                    <Divider className = 'divider'/>
                </Col>
            </Row>
        </Grid>
    </div>
    , document.getElementById('root')
);

registerServiceWorker()