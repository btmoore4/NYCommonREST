var express = require("express");
var cors = require('cors');

var app = express();
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => {
 console.log('Server running on port '+port);
});

app.get("/", (req, res, next) => {
    res.json("Hello World")
 });
