import React, {Component} from 'react'
import './App.css'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Icon } from 'antd'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import TopNav from './Navbar'
import Home from './Home'
import ProjectsTable from './ProjectsTable'
import SelectTags from './AssocSurvey'
import ProjectCharts from './ProjectsCharts'
import SignIn from './SignIn'
import { GoogleLogin } from 'react-google-login'


// Styles
const LoginBtn = { 
    background: 'whitesmoke', 
    border: 'solid #1890ff thin', 
    marginTop: 15, 
    padding: '10px' 
}
const background = {
    backgroundColor: 'whitesmoke',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    overflow: 'hidden'
}
const video = {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'grayscale(75%) brightness(25%)'
}
const foreground = {
    zIndex: 1,
    width: '50rem',
    textAlign: 'center',
    border: 'solid thin whitesmoke',
    padding: '2%'
}


const success_generator = (setState)=> (response)=> {
    setState({ googleToken: response })
}


class App extends Component{
    state = { googleToken: '' }
    render(){
        const success = success_generator(this.setState.bind(this))
        return(
            this.state.googleToken? (
                <Router>
                    <div className='container'>
                        <TopNav />
                        <Grid fluid>
                            <Row>
                                <Col lg={12}>
                                    <Switch>
                                        <Redirect exact to='/home' from ='/' />
                                        <Route component = {Home} path = '/home' />
                                        <Route render = { props=> <ProjectsTable {...props} googleToken = {this.state.googleToken} /> } path = '/projects' />
                                        <Route render = { props=> <SelectTags {...props} googleToken = {this.state.googleToken} /> } path = '/associates' />
                                        <Route component = {ProjectCharts} path = '/projectCharts' />
                                    </Switch>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Router>
            ):(
                <div style={background}>
                    <video 
                        style={video}
                        className='videoSignIn'
                        src='http://nguyentom.com/capstone/blog3.mp4'
                        autoPlay 
                        loop
                        muted
                    >
                    </video>
                    <div style={foreground}>
                        <SignIn />
                        <GoogleLogin 
                            clientId={'1079311309956-sfnl438ioar2h22p14panqudljq70gks.apps.googleusercontent.com'}
                            onSuccess={success} 
                            style={LoginBtn}
                        >
                            <a type='danger'><Icon type='google' /> Sign In</a>
                        </GoogleLogin>
                    </div>
                </div>
            )
        )
    }
}
export default App