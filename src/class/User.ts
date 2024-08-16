import { tweets } from "../database/tweets";
import { users } from "../database/users";
import { BaseId } from "./BaseId";
import { Tweet, TweetType } from "./Tweet";
// User:
// Identificador único automatico
// Nome
// E-mail//unico
// Username//unico
// Senha

//Follower:
//não pode seguir a si mesmo
//deve poder acessar a lista de users que ele segue 'followed?'

//like:
//deve pode curtir tweets dos outros e só pode curtir uma vez, se clicar 2x
//pode curtir replies tb
//não pode se curtir?

//feed:
//tweets do usuario + tweets dos seguidos
//deve ser mostrado com tds detalhes (likes e replies)

/**
 * layout tweet no console log:
 *
 * @<username>: <content>
 *      <likes> ##
 *     <replies> ##
 * ex:
 * @daphne: Olá
 * [@bruna and 3 more liked this]
 *    > @bruna: hey!
 */

export class User extends BaseId {
  private _name: string;
  private _username: string;
  private _email: string;
  private _password: string;
  private _follower: User[];

  constructor(name: string, username: string, email: string, password: string) {
    super();
    this._name = name;
    this._username = username;
    this._email = email;
    this._password = password;
    this._follower = [];
  }

  //----- MÉTODOS -----//

  public sendTweet(tweet: Tweet): void {
    if (tweet.user === this) {
      tweets.push(tweet);
      tweet.show();
    } else {
      console.log("Tweet de outro usuário");
    }
  }

  public follow(user: User): void {
    if (user.id !== this.id && !this._follower.includes(user)) {
      this._follower.push(user);
      console.log(`<@${this.username} seguiu @${user.username}>`);
    } else {
      const index = this._follower.findIndex((user) =>
        this._follower.includes(user)
      );
      this._follower.splice(index, 1);
      console.log(`<@${this.username} deixou de seguir @${user.username}>`);
    }
  }

  public showFeed(): void {
    const feed = tweets
      .filter(
        (tweet) =>
          tweet.username === this._username ||
          this._follower.some(
            (followedUser) => followedUser.username === tweet.username
          )
      )
      .map((tweet) => {
        let info = `@${tweet.username}: ${tweet.content}`;

        const likesInfo = tweet.showLikes();
        if (likesInfo) {
          info += `\n${likesInfo}`;
        }

        const repliesInfo = tweet.showReplies();
        if (repliesInfo) {
          info += `\n${repliesInfo}`;
        }

        return info;
      });
    console.log(
      `${feed.join(
        "\n-----------------------------------------\n"
      )}\n-----------------------------------------`
    );
  }

  public showTweets(): void {
    const feed = tweets
      .filter((tweet) => tweet.username === this._username)
      .map((tweet) => {
        let info = `@${tweet.username}: ${tweet.content}`;

        const likesInfo = tweet.showLikes();
        if (likesInfo) {
          info += `\n${likesInfo}`;
        }

        const repliesInfo = tweet.showReplies();
        if (repliesInfo) {
          info += `\n${repliesInfo}`;
        }

        return info;
      });
    console.log(
      `${feed.join(
        "\n-----------------------------------------\n"
      )}\n-----------------------------------------`
    );
  }

  //----- GETTERS -----//
  public get name(): string {
    return this._name;
  }

  public get username(): string {
    return this._username;
  }
}
