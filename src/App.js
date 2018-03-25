import React, {Component} from 'react'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Button, Icon, Divider } from 'antd'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import TopNav from './Navbar'
import Home from './Home'
import ProjectsContainer from './ProjectsContainer'
import SelectTags from './AssocSurvey'
import SignIn from './SignIn'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

const signinStyle = { backgroundColor: 'whitesmoke', padding: '5% 0 5% 0' }
const LoginBtn = { background: 'none', border: 'none', marginTop: 15 }
const dividerStyle = { marginTop: 10 }

const success_generator = (setState)=> (response)=> {
    console.log(response) // user attributes from Google
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
                                    <Redirect to="/home" from ="/" />
                                    <Route component = {Home} path = '/home' />
                                    <Route component = {ProjectsContainer} path = '/projects' />
                                    <Route component = {SelectTags} path = '/associates' />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </Router>
            ):(
                <div style={signinStyle}>
                    <Row center='xs'>
                        <Col xs={6}>
                            <SignIn/>
                            <GoogleLogin clientId = {'1079311309956-sfnl438ioar2h22p14panqudljq70gks.apps.googleusercontent.com'} onSuccess = {success} style = {LoginBtn}>
                                <Button ghost type='danger'>
                                    <Icon type='google'/> Sign In
                                </Button>
                            </GoogleLogin>
                        </Col>
                    </Row>
                </div>
            )
        )
    }
}
export default App