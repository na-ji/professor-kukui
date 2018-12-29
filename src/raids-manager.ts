import { Raid, RaidLevel } from './models/raid';
import {
  Client,
  Guild,
  Message,
  MessageReaction,
  TextChannel,
  User
} from 'discord.js';
import { Participant } from './models/participant';

const enum REACTIONS {
  EMOJI_1 = '1⃣',
  EMOJI_2 = '2⃣',
  EMOJI_3 = '3⃣',
  EMOJI_4 = '4⃣',
  EMOJI_5 = '5⃣',
  EMOJI_6 = '6⃣'
}

const reactions = [
  REACTIONS.EMOJI_1 as string,
  REACTIONS.EMOJI_2 as string,
  REACTIONS.EMOJI_3 as string,
  REACTIONS.EMOJI_4 as string,
  REACTIONS.EMOJI_5 as string,
  REACTIONS.EMOJI_6 as string
];

const reactionsToNumberOfAccounts: { [s: string]: number } = {
  [REACTIONS.EMOJI_1]: 1,
  [REACTIONS.EMOJI_2]: 2,
  [REACTIONS.EMOJI_3]: 3,
  [REACTIONS.EMOJI_4]: 4,
  [REACTIONS.EMOJI_5]: 5,
  [REACTIONS.EMOJI_6]: 6
};

class RaidsManager {
  public raidsInProgress: Raid[] = [];
  public client: Client;
  public guild: Guild;
  public channel: TextChannel;

  public async createRaid(gym: string, level: RaidLevel, duration: number) {
    let raid = new Raid(gym, level, duration);
    let message = (await this.channel.send(
      '',
      raid.createSummary()
    )) as Message;

    raid.addMessage(message);
    await this.createReactions(message);
    this.listenToReaction(raid, message);

    this.raidsInProgress.push(raid);
  }

  private createReactions(message: Message): Promise<MessageReaction> {
    return message
      .react(REACTIONS.EMOJI_1)
      .then(() => message.react(REACTIONS.EMOJI_2))
      .then(() => message.react(REACTIONS.EMOJI_3))
      .then(() => message.react(REACTIONS.EMOJI_4))
      .then(() => message.react(REACTIONS.EMOJI_5))
      .then(() => message.react(REACTIONS.EMOJI_6));
  }

  private listenToReaction(raid: Raid, message: Message) {
    const filter = (reaction: MessageReaction, user: User) =>
      reactions.includes(reaction.emoji.name) && user.id !== message.author.id;

    const collector = message.createReactionCollector(filter, {
      time: 180 * 60 * 1000
    });
    collector.on('collect', async (reaction: MessageReaction) => {
      const users = await reaction.fetchUsers();
      const user = users.find((user: User) => user.id !== message.author.id);

      this.createParticipant(raid, user, reaction);
      message.edit('', raid.createSummary());
      reaction.remove(user);
    });
  }

  private createParticipant(raid: Raid, user: User, reaction: MessageReaction) {
    const numberOfAccounts = reactionsToNumberOfAccounts[reaction.emoji.name];
    const participant = new Participant(user, numberOfAccounts);
    raid.addParticipant(participant);
  }
}

export = new RaidsManager();
