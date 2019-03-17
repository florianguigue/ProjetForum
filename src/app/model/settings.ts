export class Settings {
  private _start_time: number;
  private _end_time: number;
  private _time_meeting: number;
  private _max_rank: number;

  constructor(start_time: number, end_time: number, time_meeting: number, max_rank: number) {
    this._start_time = start_time;
    this._end_time = end_time;
    this._time_meeting = time_meeting;
    this._max_rank = max_rank;
  }

  get start_time(): number {
    return this._start_time;
  }

  set start_time(value: number) {
    this._start_time = value;
  }

  get end_time(): number {
    return this._end_time;
  }

  set end_time(value: number) {
    this._end_time = value;
  }

  get time_meeting(): number {
    return this._time_meeting;
  }

  set time_meeting(value: number) {
    this._time_meeting = value;
  }

  get max_rank(): number {
    return this._max_rank;
  }

  set max_rank(value: number) {
    this._max_rank = value;
  }
}
