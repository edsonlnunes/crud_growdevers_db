import { randomUUID } from "crypto";

export class Address {
  private _id: string;
  get id(): string {
    return this._id;
  }

  private _street: string;
  get street(): string {
    return this._street;
  }

  private _city: string;
  get city(): string {
    return this._city;
  }

  private _uf: string;
  get uf(): string {
    return this._uf;
  }

  constructor(street: string, city: string, uf: string) {
    this._id = randomUUID();
    this._street = street;
    this._city = city;
    this._uf = uf;
  }

  static create(id: string, street: string, city: string, uf: string) {
    const model = new Address(street, city, uf);
    model._id = id;
    return model;
  }

  update(street: string, city: string, uf: string): void {
    this._city = city;
    this._street = street;
    this._uf = uf;
  }

  toJson() {
    return {
      id: this._id,
      street: this._street,
      city: this._city,
      uf: this._uf,
    };
  }
}
