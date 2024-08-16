import { BaseId } from "./BaseId";
import { User } from "./User";

export class Like extends BaseId {
  private _user: User;

  constructor(user: User) {
    super();
    this._user = user;
  }

  public get user(): User {
    return this._user;
  }
}
