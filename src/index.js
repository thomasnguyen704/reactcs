import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Grid, Row, Col } from 'react-flexbox-grid'; 
import TopNav from './Navbar';
import Projects from './Projects';

ReactDOM.render(
    <div>
        <TopNav />

        <br/>
        
        <Grid fluid>
            <Row>
                <Col md = {4}>
                    <Projects />
                </Col>
                <Col md = {8}>
                    <p>  Well, if there's a bright center to the universe, you're on the planet that it's farthest from. I see, sir. Uh, you can call me Luke. I see, sir Luke. Just Luke. And I am See-Threepio, human-cyborg relations, and this is my counterpart, Artoo-Detoo. Hello. You got a lot of carbon scoring here. It looks like you boys have seen a lot of action. With all we've been through, sometimes I'm amazed we're in as good condition as we are, what with the Rebellion and all. You know of the Rebellion against the Empire? That's how we came to be in your service, if you take my meaning, sir. </p>
                    <p> Secure this area until the alert is canceled. Give me regular reports. Do you know what's going on? Maybe it's another drill. What was that? Oh, it's nothing. Don't worry about it. </p>
                    <p> Yes, sir. I think those new droids are going to work out fine. In fact, I, uh, was also thinking about our agreement about my staying on another season. And if these new droids do work out, I want to transmit my application to the Academy this year. You mean the next semester before harvest? Sure, there're more than enough droids. Harvest is when I need you the most. Only one more season. This year we'll make enough on the harvest so I'll be able to hire some more hands. And then you can go to the Academy next year. You must understand I need you here, Luke. But it's a whole 'nother year. Look, it's only one more season. Yeah, that's what you said last year when Biggs and Tank left. Where are you going? It looks like I'm going nowhere. I have to finish cleaning those droids. </p>
                    <p> The battle station is heavily shielded and carries a firepower greater than half the star fleet. It's defenses are designed around a direct large-scale assault. A small one-man fighter should be able to penetrate the outer defense. Pardon me for asking, sir, but what good are snub fighters going to be against that? Well, the Empire doesn't consider a small one-man fighter to be any threat, or they'd have a tighter defense. An analysis of the plans provided by Princess Leia has demonstrated a weakness in the battle station. </p>
                    <p> Hey...hey, open the pressure maintenance hatch on unit number... where are we? Three-two-six-eight-two-seven. If we can just avoid any more female advice, we ought to be able to get out of here. Well, let's get moving! Where are you going? No, wait. They'll hear! Come here, you big coward! Chewie! Come here! Listen. I don't know who you are, or where you came from, but from now on, you do as I tell you. Okay? Look, Your Worshipfulness, let's get one thing straight! I take orders from one person! Me! It's a wonder you're still alive. Will somebody get this big walking carpet out of my way? No reward is worth this. </p>
                </Col>
            </Row>
        </Grid>
    </div>
    , document.getElementById('root')
);

// registerServiceWorker();