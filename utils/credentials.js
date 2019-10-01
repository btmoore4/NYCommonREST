async function createCredentialSchema(issuer_agent, name, version, attributes){
    const cred_schema = await issuer_agent.createCredentialSchema(name, version, attributes);
    const cred_def = await issuer_agent.createCredentialDefinition(cred_schema.id);
    console.log('Publishing Credential Schema: ' + name + ' - ' + cred_schema.id + ' - ' + cred_def.id);
}

async function issueCredential(issuer_agent, user_agent, cred_id, cred_data){
    const connection_offer = await issuer_agent.createConnection({url: user_agent.url});
    console.log('Starting Connection');
    
    const user_accepted_connection = await user_agent.acceptConnection(connection_offer.id);
    console.log('User Accepted Connection');

    const accepted_connection = await issuer_agent.waitForConnection(connection_offer.id);
    console.log('Connection Accepted');

    const offer_to = {did: accepted_connection.remote.pairwise.did};
    const credential_offer = await issuer_agent.offerCredential(offer_to, cred_id, cred_data);
    console.log('Issuer Sent Credential');

    const accepted_credential = await user_agent.updateCredential(credential_offer.id, 'accepted')
    console.log('User Accepted Credential');

    const issued_credential = await issuer_agent.waitForCredential(credential_offer.id);
    console.log('Credentials Accepted');
}

async function printCredentialSchemas(issuer_agent){
    const schemas = await issuer_agent.getCredentialSchemas()
    console.log(schemas) 
}

async function printCredentialDefs(issuer_agent){
    const defs = await issuer_agent.getCredentialDefinitions()
    console.log(defs) 
}

async function printUserCredentials(user_agent){
    const creds = await user_agent.getCredentials()
    console.log(creds) 
}

module.exports = Object.assign({ createCredentialSchema, issueCredential, printCredentialSchemas, printCredentialDefs, printUserCredentials })