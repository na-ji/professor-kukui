import moment from 'moment';
import Discord, { Snowflake, Message, RichEmbed } from 'discord.js';
import { Participant } from './participant';

export enum RaidLevel {
  LEVEL_1 = 1,
  LEVEL_2,
  LEVEL_3,
  LEVEL_4,
  LEVEL_5
}

export class Raid {
  public gym: string;
  public level: RaidLevel;
  public startAt: Date;
  public endAt: Date;
  public messagesIds: Snowflake[] = [];
  public messages: Message[] = [];
  public participants: Participant[] = [];

  constructor(gym: string, level: RaidLevel, duration: number) {
    this.gym = gym;
    this.level = level;
    this.startAt = new Date();
    this.endAt = moment(this.startAt)
      .add(duration, 'minutes')
      .toDate();
  }

  createSummary(): RichEmbed {
    const embed = new Discord.RichEmbed()
      .setTitle(`Raid ${this.level}T ${this.gym}`)
      .setDescription('Yolo')
      .setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed');

    let participantsList = '';
    for (let participant of this.participants) {
      participantsList += `${participant.getParticipation()}\n`;
    }

    embed.addField(
      `${this.participants.length} Participants`,
      participantsList
    );

    return embed;
  }

  addMessage(message: Message): Raid {
    this.messagesIds.push(message.id);
    this.messages.push(message);

    return this;
  }
}
