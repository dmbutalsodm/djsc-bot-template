const secure = require('./secure.json');
const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');

const Aeiou = new Commando.Client({
	owner: '147604925612818432',
	commandPrefix: '!',
	unknownCommandResponse: false,
	disableEveryone: true,
});

Aeiou.registry
	.registerGroups([
		['core', 'Core commands'],
		['some', 'Some group'],
		['other', 'Some other group'],
	])
	.registerDefaultTypes()
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
a
Aeiou.on('ready', () => {
	console.log('lets do it');
});

Aeiou.on('message', (msg) => {
	if (msg.author.id == Aeiou.user.id) return;
	msg.channel.send(`${msg.author.username} said "${msg.content}"`);
});

Aeiou.setProvider(
	sqlite.open(path.join(__dirname, 'settings.sqlite3')).then((settingsProvider) => new Commando.SQLiteProvider(settingsProvider))
).catch(console.error);

Aeiou.login(secure.discordAPIKey);
