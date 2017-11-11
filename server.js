'use stritct';
const TelegramBot = require("node-telegram-bot-api");

var http = require('http');

function botRuner(chatId) {
    // replace the value below with the Telegram token you receive from @BotFather
    const token = '489838568:AAGIRLvCtIYja2afRrU0nR4jBUaXIB-l-ng';

    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, {
        polling: true
    });


    // Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, resp);
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        console.log(msg);
    });


}

const PORT = 8081;

function handleRequest(request, response) {
    var body = [];
    request.on('error', function (err) {
        console.error(err);
    }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        try {
            var jsonObj = JSON.parse(body);
            console.log(jsonObj.var1);
            console.log(jsonObj.var2);
            botRuner();

        } catch (e) {
            console.error(e);
        }

        response.on('error', function (err) {
            console.error(err);
        });

        response.writeHead(200);
        response.end();
    });
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});