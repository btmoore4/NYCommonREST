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

app.get("/agentIdentity", (req, res, next) => {
    getAgentIdentity(res)
 });


async function getAgentIdentity(res) {
    /* User Agent */
    const Agent = require('openssi-websdk').Agent;
    const opts = {state: 'inbound_offer'};
    const user_account_url = 'https://UserAgent:@65a20f83eb0e270dc089e94b37749a277d148275e45e5b41c4442c13.staging-cloud-agents.us-east.containers.appdomain.cloud'
    const user_agent_name = 'UserAgent';
    const user_agent_password = '6Fz0R9En20a3D3KDkxVJ';
    const agent = new Agent(user_account_url, user_agent_name, user_agent_password);
    const agentInfo = await agent.getIdentity();
    res.send(`Agent Identity: ${JSON.stringify(agentInfo, 0, 1)}`)
}

app.get("/agentCredentials", (req, res, next) => {
    getAgentCredentials(res)
 });

async function getAgentCredentials(res) {
    /* User Agent */
    const Agent = require('openssi-websdk').Agent;
    const opts = {state: 'inbound_offer'};
    const user_account_url = 'https://UserAgent:@65a20f83eb0e270dc089e94b37749a277d148275e45e5b41c4442c13.staging-cloud-agents.us-east.containers.appdomain.cloud'
    const user_agent_name = 'UserAgent';
    const user_agent_password = '6Fz0R9En20a3D3KDkxVJ';
    const agent = new Agent(user_account_url, user_agent_name, user_agent_password);
    const credentials = await agent.getCredentials()
    res.send(`Agent Credentials: ${JSON.stringify(credentials, 0, 1)}`)
}

