export class Key {

  public isDown: boolean;
  public isUp: boolean;

  public onPress: () => void;
  public onRelease: () => void;

  constructor(public code: string) {
    this.isDown = false;
    this.isUp = true;

    this._attachEventListeners();
  }

  public onDestroy() {
    window.removeEventListener('keydown', this._downHandler.bind(this));
    window.removeEventListener('keyup', this._upHandler.bind(this));
  }

  private _attachEventListeners() {
    window.addEventListener('keydown', this._downHandler.bind(this));
    window.addEventListener('keyup', this._upHandler.bind(this));
  }

  private _downHandler(event: KeyboardEvent) {
    if (event.code === this.code) {
      if (this.isUp && this.onPress) { this.onPress(); }
      this.isDown = true;
      this.isUp = false;
      event.preventDefault();
    }
  }

  private _upHandler(event: KeyboardEvent) {
    if (event.code === this.code) {
      if (this.isDown && this.onRelease) { this.onRelease(); }
      this.isUp = true;
      this.isDown = false;
      event.preventDefault();
    }
  }

}
