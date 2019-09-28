async function getAgentCredentials(res, url, user, password) {
    const Agent = require('openssi-websdk').Agent;
    const opts = { state: 'inbound_offer' };
    const agent = new Agent(url, user, password);
    const credentials = await agent.getCredentials()

    res.json(
        credentials.map(cred => {
            var data = {}
            data['schema_name'] = cred['schema_name'];
            data['schema_version'] = cred['schema_version'];
            data['attributes'] = cred['offer']['attributes'];
            return data
        })
    )
}

module.exports = Object.assign({ getAgentIdentity, getAgentCredentials })