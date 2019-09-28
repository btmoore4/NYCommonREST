const Agent = require('openssi-websdk').Agent;

async function getAgentCredentials(res, url, user, password) {
    if (typeof user === 'undefined' || typeof password === 'undefined') {
        res.send("Undefined Username or Password for Agent Credentials")
    }

    const agent = new Agent(url, user, password)
    const credentials = await agent.getCredentials()

    res.json(
        credentials.map(cred => {
            var data = {}
            data['schema_name'] = cred['schema_name']
            data['schema_version'] = cred['schema_version']
            data['attributes'] = cred['offer']['attributes']
            return data
        })
    )
}

async function getAgentVerifications(res, url, user, password) {
    if (typeof user === 'undefined' || typeof password === 'undefined') {
        res.send("Undefined Username or Password for Agent Credentials")
    }

    const agent = new Agent(url, user, password)
    const verifications = await agent.getVerifications()

    res.json(
        verifications.map(ver => {
            var data = {}
            data['name'] = ver['proof_request']['name']
            data['id'] = ver['proof_request']['id']
            data['version'] = ver['proof_request']['version']
            data['attributes'] = ver['proof_request']['requested_attributes']
            return data
        })
    )
}
module.exports = Object.assign({ getAgentCredentials, getAgentVerifications })