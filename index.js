require('dotenv').config();

const {
    pingCommand,
    game,
    setGame, 
    addCommand, 
    deleteCommand, 
    listCommand, 
    vip} = require('./lib/message');

const fs = require('fs');
const TwitchBot = require('./lib/twitchBot');
const MessageHandler = require('./lib/message');
const twitch = new TwitchBot();

const client = twitch.createClient();
const prefix = process.env.PREFIX;

let commands = 
[
    {
        command: 'ping',
        function: pingCommand
    },
    {
        command: 'game',
        function: game
    },
    {
        command: 'setgame',
        function: setGame
    },
    {
        command: 'addcommand',
        function: addCommand
    },
    {
        command: 'deletecommand',
        function: deleteCommand
    },
    {
        command: 'listcommand',
        function: listCommand
    },
    
    {
        command: 'vip',
        function: vip
    }

];

client.on('message', (channel, user, message, self) => {
    if (!message.startsWith(prefix) || self) return;

    const args = message.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    let execute = false;

    commands.forEach(cmd => {
        if (command === cmd.command) {
            cmd.function(client, channel, user, args);
            execute = true;
        }
    });
    if (!execute) {
        customCommand = fs.readFileSync('./customCommand.json')
        customCommand = JSON.parse(customCommand);
        if (customCommand && customCommand.length > 0) {
            customCommand.forEach(cmd => {
                if (command === cmd.command) {
                    client.say(channel, cmd.response);
                }
            });
        }
    }
    execute = false;
});

client.connect();