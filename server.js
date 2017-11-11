const express = require('express');
const app = express();
const Bot = require('./telegram-bot/bot.js');

app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.use('/telegram-bot/', (req, res) => {
    // console.log(req.body)
    const botInstance = Bot();
    botInstance.sendMessage('e13123');
    res.send('Hello');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});