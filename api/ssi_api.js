const Agent = require('openssi-websdk').Agent;
const URL_PREFIX = "https://"
const URL_SUFFIX = ".staging-cloud-agents.us-east.containers.appdomain.cloud"

async function getUserCredentials(res, user, password, key) {
    if (typeof user === 'undefined' || typeof password === 'undefined' || typeof key === 'undefined') {
        res.send("Undefined Username, Key, or Password for Agent Credentials")
    }

    const url =  URL_PREFIX.concat(user, ":@", key, URL_SUFFIX)
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

async function getUserVerifications(res, user, password, key) {
    if (typeof user === 'undefined' || typeof password === 'undefined' || typeof key === 'undefined') {
        res.send("Undefined Username, Key, or Password for Agent Verifications")
    }

    const url =  URL_PREFIX.concat(user, ":@", key, URL_SUFFIX)
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

module.exports = Object.assign({ getUserCredentials, getUserVerifications })