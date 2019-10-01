async function createProofSchema(proof_agent, name, version, req_attributes){
    const proof_schema = await agent.createProofSchema(name, version, req_attributes);
    console.log('Proof Schema Published');
    console.log('Publishing Proof Schema: ' + name + ' - ' + proof_schema.id);
}

async function issueProof(proof_agent, user_agent, proof_id, cred_data){
    const connection_offer = await issuer_agent.createConnection({url: user_agent.url});
    console.log('Starting Connection');
    
    const user_accepted_connection = await user_agent.acceptConnection(connection_offer.id);
    console.log('User Accepted Connection');

    const accepted_connection = await issuer_agent.waitForConnection(connection_offer.id);
    console.log('Connection Accepted');

    const proof_to = {did: accepted_connection.remote.pairwise.did};
    const proof_request = await agent.createVerification(proof_to, proof_id, 'outbound_proof_request');
    console.log('Issuer Sent Proof Request');

    await user_agent.updateVerification(proof_request.id, 'proof_generated');
    await user_agent.updateVerification(proof_request.id, 'proof_shared');
    console.log('User Accepting Proof Request');

    const finished_verification = await agent.waitForVerification(proof_request.id);
    console.log('Proof Transaction Complete');
}

module.exports = Object.assign({ createProofSchema, issueProof })