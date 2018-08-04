import { CommandoClient } from 'discord.js-commando';
import { config as dotenvInit } from 'dotenv';

import * as commands from './commands';

dotenvInit();

const client = new CommandoClient({
  commandPrefix: process.env.BOT_COMMAND_PREFIX,
  owner: process.env.BOT_OWNER,
  disableEveryone: true
});

client.registry
  .registerDefaultTypes()
  .registerGroups([['raids', 'Commands to create and manage raids']])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommands(Object.values(commands));

client.on('ready', () => {
  console.log('Ready!');

  client.user.setActivity('Coding...');
});

client.login(process.env.BOT_TOKEN);
