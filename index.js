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
var SSI = require('./api/ssi_api.js')

app.get("/userCredentials", (req, res, next) => {
    const agent_user = req.query.user
    const agent_password = req.query.password
    const agent_key = req.query.key
    SSI.getUserCredentials(res, agent_user, agent_password, agent_key)
});

app.get("/userVerifications", (req, res, next) => {
    const agent_user = req.query.user
    const agent_password = req.query.password
    const agent_key = req.query.key
    SSI.getUserVerifications(res, agent_user, agent_password, agent_key)
});

/* MOCK Routes */
var Mock = require('./api/mock_api.js')

app.get("/mockUserCredentials", (req, res, next) => {
    Mock.getMockUserCredentials(res)
});

app.get("/mockUserVerifications", (req, res, next) => {
    Mock.getMockUserVerifications(res)
});