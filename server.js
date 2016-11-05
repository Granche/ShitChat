var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(__dirname + "/public"));

var data = {
	logopic: "./public/shit.png",
	header: "<h2> Welcome ShitChat </h2>",
	underheader: "<h4> Chat with others taking a shit! </h4>",	
	msgs: []
}

app.get("/shitchat", function (req, res){
	res.sendFile("nychat.html", {root:__dirname+ "/public"})
})

app.get('/api/shitchat', function (req, res) {
	res.json({data:data})
});

app.post('/api/shitchat', function (req, res) {
	data.msgs.push({
		message: req.body.message
	})
	res.redirect('/shitchat');
});

app.put('/api/shitchat/:id', function (req, res) {
	data.msgs[req.params.id-1] = {message: req.body.message};
	res.json({ status: "Lyckat" });
});

app.delete('/api/shitchat/:id', function (req, res){
	data.msgs.splice(req.params.id-1, 1);
	res.redirect('/shitchat');
});














var server = app.listen(5000, function () {
	var port = server.address().port;

	console.log('Server up and running on port ' + port);
});
