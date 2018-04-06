import React, {Component} from 'react'
import './App.css'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Icon } from 'antd'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import TopNav from './Navbar'
import Home from './Home'
import ProjectsContainer from './ProjectsContainer'
import SelectTags from './AssocSurvey'
import SignIn from './SignIn'
import { GoogleLogin } from 'react-google-login'

const signinStyle = { backgroundColor: 'whitesmoke', height: '100vh', display: 'flex', alignItems: 'center', padding: '5% 0 10% 0', overflow: 'hidden' }
const LoginBtn = { color: 'white', background: 'whitesmoke', border: 'solid #1890ff thin', marginTop: 15, padding: '10px' }

const success_generator = (setState)=> (response)=> {
    console.log(response) // user attributes from Google
    console.log('User Email: ' + response.profileObj.email) // email from Google
    console.log('Full Name: ' + response.profileObj.name)
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
                                        <Redirect exact to="/home" from ="/" />
                                        <Route component = {Home} path = '/home' />
                                        <Route component = {ProjectsContainer} path = '/projects' />
                                        <Route component = {SelectTags} path = '/associates' />
                                    </Switch>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Router>
            ):(
                <Row center='xs' style={signinStyle}>
                    <Col xs={6}>
                        <SignIn />
                        <GoogleLogin clientId={'1079311309956-sfnl438ioar2h22p14panqudljq70gks.apps.googleusercontent.com'} onSuccess={success} style={LoginBtn}>
                            <a type='danger'><Icon type='google' /> Sign In</a>
                        </GoogleLogin>
                    </Col>
                </Row>
            )
        )
    }
}
export default App