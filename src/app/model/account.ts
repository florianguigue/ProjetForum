export class Account {
  private _name: string;
  private _prenom: string;
  private _description: string;
  private _CV: string;
  private _offers: Array<string>;
  private _picture: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get CV(): string {
    return this._CV;
  }

  set CV(value: string) {
    this._CV = value;
  }


  get offers(): Array<string> {
    return this._offers;
  }

  set offers(value: Array<string>) {
    this._offers = value;
  }


  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }
}
