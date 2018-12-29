import { Command, CommandMessage, CommandoClient } from 'discord.js-commando';

import RaidManager from '../../raids-manager';

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
          key: 'timeRemaining',
          prompt: 'Number of minutes until unpop',
          type: 'integer',
          default: 45
        }
      ]
    });
  }

  run(
    message: CommandMessage,
    {
      gym,
      level,
      timeRemaining = 45
    }: { gym: string; level: number; timeRemaining: number }
  ) {
    console.log(gym, level, timeRemaining);

    message.say(
      JSON.stringify({
        gym,
        level,
        timeRemaining
      })
    );

    return RaidManager.createRaid(gym, level, timeRemaining).then(() =>
      message.say('Raid created')
    );
  }
}
