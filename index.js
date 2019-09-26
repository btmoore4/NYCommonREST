var express = require("express");
var cors = require('cors');

var app = express();
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => {
 console.log('Server running on port '+port);
});

app.get("/", (req, res, next) => {
    res.json("Hello World")
 });

const url = 'https://UserAgent:@65a20f83eb0e270dc089e94b37749a277d148275e45e5b41c4442c13.staging-cloud-agents.us-east.containers.appdomain.cloud'

app.get("/agentIdentity", (req, res, next) => {
    const agent_user = req.query.user
    const agent_password = req.query.password
    if (typeof agent_user === 'undefined' || typeof agent_password === 'undefined') {
        res.send("Undefined Username or Password for Agent Identity")    
    }else{
        getAgentIdentity(res, agent_user, agent_password)
    }
 });

async function getAgentIdentity(res, user, password) {
    const Agent = require('openssi-websdk').Agent;
    const opts = {state: 'inbound_offer'};
    const agent = new Agent(url, user, password);
    const agentInfo = await agent.getIdentity();
    res.send(`Agent Identity: ${JSON.stringify(agentInfo, 0, 1)}`)
}

app.get("/agentCredentials", (req, res, next) => {
    const agent_user = req.query.user
    const agent_password = req.query.password
    if (typeof agent_user === 'undefined' || typeof agent_password === 'undefined') {
        res.send("Undefined Username or Password for Agent Credentials")    
    }else{
        getAgentCredentials(res, agent_user, agent_password)
    }
 });

async function getAgentCredentials(res, user, password) {
    const Agent = require('openssi-websdk').Agent;
    const opts = {state: 'inbound_offer'};
    const agent = new Agent(url, user, password);
    const credentials = await agent.getCredentials()
    res.send(`Agent Credentials: ${JSON.stringify(credentials, 0, 1)}`)
}

