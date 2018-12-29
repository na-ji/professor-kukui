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
  public messages: Map<Snowflake, Message> = new Map();
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
    let numberOfParticipants = 0;

    for (let participant of this.participants) {
      numberOfParticipants += participant.numberOfAccounts;
      participantsList += `${participant.getParticipation()}\n`;
    }

    if (participantsList.length === 0) {
      participantsList = 'None';
    }

    embed.addField(`${numberOfParticipants} Participants`, participantsList);

    return embed;
  }

  addMessage(message: Message): Raid {
    this.messages.set(message.id, message);

    return this;
  }

  addParticipant(participant: Participant) {
    this.participants.push(participant);
  }
}
