const tmi = require('tmi.js');

class twitchBot {
    constructor() {
    }

    createClient() {
        const client = new tmi.Client({
            options: { debug: true },
            identity: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD
            },
            channels: [ process.env.NAME ]
        });
        return client;
    }
}

module.exports = twitchBot;