var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));



app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/whoami', (req, res)=>{
	console.log(req.connection.remoteAddress);
	console.log(req.header('x-forwarded-for'));
	let result = {
		ipaddress: req.header('x-forwarded-for').split(",")[0],
		language: req.headers['accept-language'],
		software: req.headers['user-agent']
	}
	console.log(result)
	res.json(result);
});

app.get('/api/whoami/*', (req, res)=>{
	res.redirect('/api/whoami');
})


app.get("/*", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
