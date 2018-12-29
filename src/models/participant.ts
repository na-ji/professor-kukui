import { Snowflake, User } from 'discord.js';

export class Participant {
  public userId: Snowflake;
  public user: User;
  public numberOfAccounts: number = 1;
  public numberOfTurns: number = 1;

  constructor(
    user: User,
    numberOfAccounts: number = 1,
    numberOfTurns: number = 1
  ) {
    this.user = user;
    this.userId = user.id;
    this.numberOfAccounts = numberOfAccounts;
    this.numberOfTurns = numberOfTurns;
  }

  public getParticipation(): string {
    let participation = `${this.user.username}`;

    if (this.numberOfAccounts > 1) {
      participation += ` x${this.numberOfAccounts}`;
    }
    if (this.numberOfTurns > 1) {
      participation += ` x${this.numberOfTurns} turns`;
    }

    return participation;
  }
}
