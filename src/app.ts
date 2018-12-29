import { CommandoClient } from 'discord.js-commando';
import { config as dotenvInit } from 'dotenv';

import * as commands from './commands';
import RaidManager from './raids-manager';
import { TextChannel } from 'discord.js';

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

  const guild = client.guilds.get(process.env.GUILD_ID);
  const channel = guild.channels.get(process.env.CHANNEL_ID) as TextChannel;

  client.user.setActivity('Coding...');
  RaidManager.client = client;
  RaidManager.guild = guild;
  RaidManager.channel = channel;
});

client.login(process.env.BOT_TOKEN);
