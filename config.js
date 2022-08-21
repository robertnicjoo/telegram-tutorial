const dotenv = require('dotenv');
const result = dotenv.config();

if(result.error) {
    throw result.error
}

console.log(result.parsed);

module.exports = {
    bot_token: process.env.BOT_TOKEN
};