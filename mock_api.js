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

module.exports = Object.assign({ getMockCredentials })