const Agent = require('openssi-websdk').Agent;
const URL_PREFIX = "https://"
const URL_SUFFIX = ".staging-cloud-agents.us-east.containers.appdomain.cloud"

async function getUserCredentials(res, name, password, key) {
    if (typeof name === 'undefined' || typeof password === 'undefined' || typeof key === 'undefined') {
        res.send("Undefined Username, Key, or Password for Agent Credentials")
    }

    const url = URL_PREFIX.concat(name, ":@", key, URL_SUFFIX)
    const agent = new Agent(url, name, password)
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

async function getUserVerifications(res, name, password, key) {
    if (typeof name === 'undefined' || typeof password === 'undefined' || typeof key === 'undefined') {
        res.send("Undefined Username, Key, or Password for Agent Verifications")
    }

    const url = URL_PREFIX.concat(name, ":@", key, URL_SUFFIX)
    const agent = new Agent(url, name, password)
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

async function getProofSchema(res, name, password, key, proof_id) {
    if (typeof name === 'undefined' || typeof password === 'undefined' || typeof key === 'undefined' || typeof proof_id === 'undefined') {
        res.send("Undefined Username, Key, or Password for Proof Agent Schemas")
    }

    const url = URL_PREFIX.concat(name, ":@", key, URL_SUFFIX)
    const agent = new Agent(url, name, password)
    const proof = await agent.verifierGetProofSchema(proof_id)
    res.json({
        'name': proof['name'],
        'id': proof['id'],
        'attributes': proof['requested_attributes']
    })
}

async function verifyProof(res, proof_name, proof_password, proof_key, user_name, user_password, user_key, proof_id) {
    if (typeof proof_name === 'undefined' || typeof proof_password === 'undefined' || typeof proof_key === 'undefined') {
        res.send("Undefined Username, Key, or Password for Proof Agent to verify Proof")
    }
    if (typeof user_name === 'undefined' || typeof user_password === 'undefined' || typeof user_key === 'undefined') {
        res.send("Undefined Username, Key, or Password for User Agent to verify Proof")
    }
    if (typeof proof_id === 'undefined') {
        res.send("Undefined Proof Id to verify Proof")
    }

    const proof_url = URL_PREFIX.concat(proof_name, ":@", proof_key, URL_SUFFIX)
    const proof_agent = new Agent(proof_url, proof_name, proof_password)
    const user_url = URL_PREFIX.concat(user_name, ":@", user_key, URL_SUFFIX)
    const user_agent = new Agent(user_url, user_name, user_password)

    const connection_offer = await proof_agent.createConnection({ url: user_agent.url })
    const user_accepted_connection = await user_agent.acceptConnection(connection_offer.id)
    const accepted_connection = await proof_agent.waitForConnection(connection_offer.id)
    const proof_to = { did: accepted_connection.remote.pairwise.did }
    const proof_request = await proof_agent.createVerification(proof_to, proof_id, 'outbound_proof_request')
    await user_agent.updateVerification(proof_request.id, 'proof_generated')
    await user_agent.updateVerification(proof_request.id, 'proof_shared')
    const finished_verification = await proof_agent.waitForVerification(proof_request.id)
    res.json('Proof Verification Complete')
}

module.exports = Object.assign({ getUserCredentials, getUserVerifications, getProofSchema, verifyProof })