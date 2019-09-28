function getMockCredentials(res) {
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

function getMockVerifications(res) {
    var mock_verifications = [
        {
            "name": "Verify Age",
            "id": "Verify Age:1.012",
            "version": "1.012",
            "attributes": {
                "DOB": {
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
                "First Name": {
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
                "Last Name": {
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
module.exports = Object.assign({ getMockCredentials, getMockVerifications })