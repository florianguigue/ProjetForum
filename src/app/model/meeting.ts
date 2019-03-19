import {User} from './user';

export class Meeting {
  private _id: string;
  private _company: User;
  private _applicant: User;
  private _start_date: Date;
  private _end_date: Date;
  private _description: string;
  private _room: string;

  constructor(id: string, company: User, applicant: User, start_date: Date, end_date: Date, description: string, room: string) {
    this._id = id;
    this._company = company;
    this._applicant = applicant;
    this._start_date = start_date;
    this._end_date = end_date;
    this._description = description;
    this._room = room;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get company(): User {
    return this._company;
  }

  set company(value: User) {
    this._company = value;
  }

  get applicant(): User {
    return this._applicant;
  }

  set applicant(value: User) {
    this._applicant = value;
  }

  get start_date(): Date {
    return this._start_date;
  }

  set start_date(value: Date) {
    this._start_date = value;
  }

  get end_date(): Date {
    return this._end_date;
  }

  set end_date(value: Date) {
    this._end_date = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get room(): string {
    return this._room;
  }

  set room(value: string) {
    this._room = value;
  }
}
