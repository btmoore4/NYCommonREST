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
    issueCommonCredential(res)
    //res.json("Hello World")
 });


async function issueCommonCredential(res) {
    /* User Agent */
    const Agent = require('openssi-websdk').Agent;
    const opts = {state: 'inbound_offer'};
    const user_account_url = 'https://UserAgent:@65a20f83eb0e270dc089e94b37749a277d148275e45e5b41c4442c13.staging-cloud-agents.us-east.containers.appdomain.cloud'
    const user_agent_name = 'UserAgent';
    const user_agent_password = '6Fz0R9En20a3D3KDkxVJ';
    const agent = new Agent(user_account_url, user_agent_name, user_agent_password);
    const agentInfo = await agent.getIdentity();
    res.send(`Agent info: ${JSON.stringify(agentInfo, 0, 1)}`)
}

