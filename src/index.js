import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import TopNav from './Navbar'
import Home from './Home'
import ProjectsContainer from './ProjectsContainer'
import SelectTags from './AssocSurvey'

ReactDOM.render(
    <Router>
        <div className='container'>
            <TopNav />
            <Grid fluid>
                <Row>
                    <Col lg={12}>
                        <Redirect to="/home" from ="/" />
                        <Route component = {Home} path = '/home' />
                        <Route component = {ProjectsContainer} path = '/projects' />
                        <Route component = {SelectTags} path = '/associates' />
                    </Col>
                </Row>
            </Grid>
        </div>
    </Router>
    , document.getElementById('root')
);

registerServiceWorker()