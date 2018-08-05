import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

export class RaidCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'raid',
      group: 'raids',
      memberName: 'raid',
      description: 'Creates a raid',
      examples: ['raid eglise 5 45'],
      guildOnly: true,
      args: [
        {
          key: 'gym',
          prompt: 'Gym where the raid is',
          type: 'string'
        },
        {
          key: 'level',
          prompt: 'Lvl of raid',
          type: 'integer'
        },
        {
          key: 'time-remaining',
          prompt: 'Number of minutes until unpop',
          type: 'integer',
          default: 45
        }
      ]
    });
  }

  run(msg: CommandMessage) {
    return msg.say("Hi, I'm awake twice!");
  }
}
