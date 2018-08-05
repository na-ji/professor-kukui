import moment from 'moment';
import { Snowflake, Message, User } from 'discord.js';

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
  public membersIds: Snowflake[] = [];
  public members: User[] = [];

  constructor(gym: string, level: RaidLevel, duration: number) {
    this.gym = gym;
    this.level = level;
    this.startAt = new Date();
    this.endAt = moment(this.startAt)
      .add(duration, 'minutes')
      .toDate();
  }
}
