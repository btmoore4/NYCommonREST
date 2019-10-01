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
    const agent_name = req.query.name
    const agent_password = req.query.password
    const agent_key = req.query.key
    SSI.getUserCredentials(res, agent_name, agent_password, agent_key)
});

app.get("/userVerifications", (req, res, next) => {
    const agent_name = req.query.name
    const agent_password = req.query.password
    const agent_key = req.query.key
    SSI.getUserVerifications(res, agent_name, agent_password, agent_key)
});

app.get("/proofSchema", (req, res, next) => {
    const agent_name = req.query.name
    const agent_password = req.query.password
    const agent_key = req.query.key
    const agent_proof_id = req.query.proof
    SSI.getProofSchema(res, agent_name, agent_password, agent_key, agent_proof_id)
});

app.get("/verifyProof", (req, res, next) => {
    const proof_name = req.query.proof_name
    const proof_password = req.query.proof_password
    const proof_key = req.query.proof_key
    const user_name = req.query.user_name
    const user_password = req.query.user_password
    const user_key = req.query.user_key
    const proof_id = req.query.proof
    SSI.verifyProof(res, proof_name, proof_password, proof_key, user_name, user_password, user_key, proof_id)
});

/* MOCK Routes */
var Mock = require('./api/mock_api.js')

app.get("/mockUserCredentials", (req, res, next) => {
    Mock.getMockUserCredentials(res)
});

app.get("/mockUserVerifications", (req, res, next) => {
    Mock.getMockUserVerifications(res)
});

app.get("/mockProofSchema", (req, res, next) => {
    Mock.getMockProofSchema(res)
});

app.get("/mockVerifyProof", (req, res, next) => {
    Mock.verifyMockProofCredentials(res)
});