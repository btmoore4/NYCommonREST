function getMockUserCredentials(res) {
    var mock_credentials = [
        {
            "schema_name": "New York Driver's Liscence",
            "schema_version": "0.0.1",
            "attributes": {
                "first_name": "Beatrice",
                "last_name": "Miller",
                "sex": "F",
                "dob": "1999-02-07",
                "dl_num": "M8930 37465 27127"
            },
        },
        {
            "schema_name": "New York City Public Library",
            "schema_version": "0.0.1",
            "attributes": {
                "first_name": "Bea",
                "last_name": "Miller",
                "dob": "1999-02-07",
                "exp": "2020-03-01",
                "card_num": "L0189235790385629"
            },
        }
    ];
    res.json(mock_credentials);
}

function getMockUserVerifications(res) {
    var mock_verifications = [
        {
            "name": "Verify Age",
            "id": "Verify Age:1.012",
            "version": "1.012",
            "attributes": {
                "dob_referent": {
                    "name": "DOB",
                    "restrictions": [
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:96:TAG1"
                        },
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:96:TAG1"
                        },
                    ]
                },
                "first_name_referent": {
                    "name": "First Name",
                    "restrictions": [
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:96:TAG1"
                        },
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:294:TAG1"
                        }
                    ]
                },
                "last_name_referent": {
                    "name": "Last Name",
                    "restrictions": [
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:96:TAG1"
                        },
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:294:TAG1"
                        }
                    ]
                },
            },
        }
      ]
    res.json(mock_verifications);
}

function getMockProofSchema(res) {
    var mock_proof = {
            "name": "Verify Age",
            "id": "Verify Age:1.012",
            "attributes": {
                "dob_referent": {
                    "name": "DOB",
                    "restrictions": [
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:96:TAG1"
                        },
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:96:TAG1"
                        },
                    ]
                },
                "first_name_referent": {
                    "name": "First Name",
                    "restrictions": [
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:96:TAG1"
                        },
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:294:TAG1"
                        }
                    ]
                },
                "last_name_referent": {
                    "name": "Last Name",
                    "restrictions": [
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:96:TAG1"
                        },
                        {
                            "cred_def_id": "V15FcuVb5wVaJuYgyQHjjn:3:CL:294:TAG1"
                        }
                    ]
                },
            }
        }
    res.json(mock_proof);
}

module.exports = Object.assign({ getMockUserCredentials, getMockUserVerifications, getMockProofSchema })