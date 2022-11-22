import { randomUUID } from "crypto";

export class Assessment {
  private _id: string;
  get id(): string {
    return this._id;
  }

  private _score: number;
  get score(): number {
    return this._score;
  }

  private _subject: string;
  get subject(): string {
    return this._subject;
  }

  constructor(score: number, subject: string) {
    this._id = randomUUID();
    this._score = score;
    this._subject = subject;
  }

  static create(id: string, score: number, subject: string): Assessment {
    const model = new Assessment(score, subject);
    model._id = id;
    return model;
  }

  toJson() {
    return {
      id: this._id,
      score: this._score,
      subject: this._subject,
    };
  }
}
