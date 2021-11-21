const fs = require('fs');

function pingCommand(client, channel) {
        client.say(channel, 'Bot Ready');
}

function game(client, channel) {
    let status = JSON.parse(fs.readFileSync('./status.json'));
    if (!status.game  || status.game === '') {
        client.say(channel, 'No game is currently set');
    } else {
        client.say(channel, 'Bastrok playing at ' + status.game);
    }
}

function setGame(client, channel, user, args) {
    if (user.mod || user.badges.broadcaster) {
        let status = JSON.parse(fs.readFileSync('./status.json'));
        status.game = args.join(' ');
        client.say(channel, 'The game is now ' + status.game);
        fs.writeFileSync( './status.json',(JSON.stringify(status)));
    }
}

function addCommand(client, channel, user, args) {
    if (user.mod || user.badges.broadcaster) {
        let customCommand = JSON.parse(fs.readFileSync('./customCommand.json'));
        customCommand.push({
            command: args[0],
            response: args.slice(1).join(' ')
        });
        fs.writeFileSync( './customCommand.json',(JSON.stringify(customCommand)));
        client.say(channel, 'Command ' + args[0] + ' added');
    }
}

function deleteCommand(client, channel, user, args) {
    if (user.mod || user.badges.broadcaster) {
        let customCommand = JSON.parse(fs.readFileSync('./customCommand.json'));
        customCommand = customCommand.filter(cmd => cmd.command !== args[0]);
        fs.writeFileSync( './customCommand.json',(JSON.stringify(customCommand)));
        client.say(channel, 'Command ' + args[0] + ' deleted');
    }
}

function listCommand(client, channel, user, args) {
    if (user.mod || user.badges.broadcaster) {
        let customCommand = JSON.parse(fs.readFileSync('./customCommand.json'));
        let response = '';
        customCommand.forEach(cmd => {
            response += cmd.command + ' ';
        });
        client.say(channel, 'The currently custom command are ' + response);
    }
}

function vip(client, channel, user, args) {
    if (user.mod || user.badges.broadcaster) {
        client.say(channel, user.username + ' is now a vip');
        client.vip(channel, user.username);
    }
}

module.exports = {pingCommand, game, setGame, addCommand, deleteCommand, listCommand, vip};