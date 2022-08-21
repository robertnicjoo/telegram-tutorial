const TelegramBot = require('node-telegram-bot-api');
const {
    bot_token
} = require('./config');
const Promise = require('bluebird');
Promise.config({
    cancellation: true
});


const bot = new TelegramBot(bot_token, {polling: true});

bot.on('message', async (msg) => {
    bot.on('polling_error', (meg) => {
        console.log(msg);
    });

    const chatId = msg.chat.id;
    const text = msg.text;

    // keyboard start+
    const keyboard = {
        parse_mode: "html",
        reply_markup: JSON.stringify({
            inline_keyboard:
            [
                [
                    {
                        text: 'info',
                        callback_data: '1',
                    },
                    {
                        text: 'contact',
                        callback_data: '2',
                    }
                ]
            ]
        }),
    }
    // keyboard ends

    if(text == '/start') {
        bot.sendMessage(chatId, 'Welcome');
    } else {
        bot.sendMessage(chatId, 'Please select an option', keyboard);
    }
});

bot.on('callback_query', async function(query) {
    var text = query.data;
    var chatId = query.from.id;
    if(text == '1') {
        bot.sendMessage(chatId, 'You have chose <b>INFO</b>', { parse_mode: "html"});
    } else if(text == '2') {
        bot.sendMessage(chatId, 'You have chose <b>CONTACT</b>', { parse_mode: "html"});
    }
});