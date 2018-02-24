import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Divider } from 'antd'

class Home extends React.Component {
    render(){
        return(
            <div>
                <Row>
                    <Col md={12} lg={4}>
                        <h1>Human Capital Analytics</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Col>
                    <Col md={12} lg={8}>
                        <iframe
                            title = 'blog3'
                            src = 'https://www.youtube.com/embed/F085WwMIWgM?showinfo=0' 
                            frameborder = '0' 
                            allow = 'autoplay; encrypted-media' 
                            allowfullscreen
                            style={{ width: '100%', minHeight: '405px' }}
                        />
                    </Col>
                </Row>
                <Divider />
            </div>
        )
    }
}
export default Home

/*
const jumbotron = {
    width: '100%',
    height: '70vh',
    backgroundColor: 'whitesmoke',
    padding: '25px',
    marginBottom: '100px',
    background: 'url(https://thumbor.forbes.com/thumbor/1280x868/smart/https%3A%2F%2Fblogs-images.forbes.com%2Fjoshsteimle%2Ffiles%2F2015%2F08%2Ftodoist-office2-1940x1294.jpg) no-repeat center center fixed',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center'
}
const jumbotitle = {
    fontSize: '3em', 
    color: 'white', 
    textShadow: '1px 1px dimgrey',
    textAlign: 'center',
    fontStretch: 'ultra-expanded',
    fontFamily: '"Open Sans", sans-serif'

}
<Row>
    <div style = {jumbotron}>
        <Col sm={12}>
            <p style = {jumbotitle}>Human Capital Analytics</p>
        </Col>
    </div>
</Row>
*/