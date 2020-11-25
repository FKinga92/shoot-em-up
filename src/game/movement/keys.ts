import { Key } from './key';

export interface Keys {
  up: Key;
  down: Key;
  left: Key;
  right: Key;
  shoot: Key;
}

export type ControlKey = 'up' | 'down' | 'left' | 'right' | 'shoot';
