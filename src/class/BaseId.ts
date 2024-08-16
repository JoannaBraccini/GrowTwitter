import { randomUUID } from "crypto";

export abstract class BaseId {
  private _id: string;

  constructor() {
    this._id = randomUUID();
  }

  //----- GETTERS -----//
  public get id(): string {
    return this._id;
  }
}
