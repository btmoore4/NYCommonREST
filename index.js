var express = require("express");
var cors = require('cors');

var app = express();
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});

app.get("/", (req, res, next) => {
    res.json("NYCommon OPEN-SSI REST Server")
});

/* SSI Routes */
var SSI = require('./ssi_api.js')
const user_url = 'https://UserAgent:@65a20f83eb0e270dc089e94b37749a277d148275e45e5b41c4442c13.staging-cloud-agents.us-east.containers.appdomain.cloud'
const ben_url = "https://BenAgent:@65a20f83eb0e270dc089e94b37749a277d148275e45e5b41c4442c13.staging-cloud-agents.us-east.containers.appdomain.cloud"

app.get("/agentCredentials", (req, res, next) => {
    const agent_user = req.query.user
    const agent_password = req.query.password
    SSI.getAgentCredentials(res, user_url, agent_user, agent_password)
});

app.get("/agentVerifications", (req, res, next) => {
    const agent_user = req.query.user
    const agent_password = req.query.password
    SSI.getAgentVerifications(res, ben_url, agent_user, agent_password)
});

/* MOCK Routes */
var Mock = require('./mock_api.js')

app.get("/mockCredentials", (req, res, next) => {
    Mock.getMockCredentials(res)
});