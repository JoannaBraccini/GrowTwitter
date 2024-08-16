import { BaseId } from "./BaseId";
import { Like } from "./Like";
import { User } from "./User";
// Tweet:
// Identificador unico automatico
// Conteúdo
// Tipo(normal ou reply)

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

/**
 * layout tweets com/sem likes
 *
 * sem like: não mostrar
 * 1 like: @<username> curtiu
 * mais de 1: <@username> e mais N usuarios curtiram
 */

export type TweetType = "tweet" | "reply";
export class Tweet extends BaseId {
  private _content: string;
  private _type: string;
  private _user: User;
  private _likes: Like[];
  private _replies: Tweet[];

  constructor(user: User, content: string, type: TweetType) {
    super();
    this._content = content;
    this._type = type;
    this._user = user;
    this._likes = [];
    this._replies = [];
  }

  //----- MÉTODOS -----//
  public reply(user: User, content: string): void {
    const tweet = new Tweet(user, content, "reply");
    this._replies.push(tweet);
  }

  public like(user: User): void {
    const dislike = this._likes.some((like) => like.user === user);
    if (dislike) {
      const index = this._likes.findIndex((like) => like.user === user);
      this._likes.splice(index, 1);
      console.log(`[@${user.username} descurtiu o tweet]`);
    } else if (user === this._user) {
      console.log("Você não pode curtir seu próprio conteúdo.");
    } else {
      const newLike = new Like(user);
      console.log(`[@${user.username} curtiu o tweet]`);
      this._likes.push(newLike);
    }
  }

  show(): void {
    console.log(`@${this._user.username}: ${this.content}`);
  }

  public showLikes(): string {
    const likeCount = this._likes.length;
    if (likeCount > 0) {
      const firstLikeUser = this._likes[0].user.username;
      if (likeCount === 1) {
        return `[@${firstLikeUser} curtiu o tweet]`;
      } else {
        return `[@${firstLikeUser} e mais ${likeCount - 1} ${
          likeCount > 1 ? "usuários curtiram" : "curtiu"
        }]`;
      }
    }
    return "";
  }

  public showReplies(): string {
    return this._replies
      .map((reply) => `   > @${reply.user.username}: ${reply.content}`)
      .join("\n");
  }

  //----- GETTERS -----//
  public get type(): string {
    return this._type;
  }

  public get content(): string {
    return this._content;
  }

  public get likes(): Like[] {
    return this._likes;
  }

  public get replies(): Tweet[] {
    return this._replies;
  }

  public get username(): string {
    return this._user.username;
  }

  public get user(): User {
    return this._user;
  }
}
