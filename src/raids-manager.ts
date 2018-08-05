import { Raid, RaidLevel } from './models/raid';
import { Client, Message, TextChannel } from 'discord.js';

class RaidsManager {
  public raidsInProgress: Raid[] = [];
  public client: Client;

  public async createRaid(gym: string, level: RaidLevel, duration: number) {
    let raid = new Raid(gym, level, duration);
    let message = await this.getChannel().send(raid.createSummary());
    raid.addMessage(message as Message);

    this.raidsInProgress.push(raid);
  }

  private getChannel(): TextChannel {
    const guild = this.client.guilds.get('389903312423747594');

    return guild.channels.get('475048984264704000') as TextChannel;
  }
}

export = new RaidsManager();
