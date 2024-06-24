import { Pet } from '@prisma/client';

export interface Credentials {
  email: string;
  password: string;
}

export interface PetCharacteristics {
  breed: 'cat' | 'dog' | 'sheep';
  color: string;
  name: string;
}

export interface RegisterCredentials extends Credentials, PetCharacteristics {}

type PetValuesTypes = Pet[keyof Pet];

export type PetWithIndex = { [key: string]: PetValuesTypes } | null;

export interface Stats {
  [key: string]: number
}

export interface Item {
  id: string;
  name: string;
  stats: Stats;
  experience: number;
}

interface PetConstructorProp {
  breed?: PetCharacteristics['breed'];
  value: number;
  size: {
    width: number,
    height: number
  };
  position: {
    x: number,
    y: number
  }
}
export interface PetConstructorState {
  body: PetConstructorProp;
  brows: PetConstructorProp;
  ears: PetConstructorProp;
  head: PetConstructorProp;
  tail: PetConstructorProp;
  whiskers: PetConstructorProp;
  patterns: PatternsPayload[];
  [key: string]: PetConstructorProp | PatternsPayload[];
}

export interface ChangeVisionPayload extends PetConstructorProp {
  part: Exclude<keyof PetConstructorState, 'patterns' | 'body'>;
}

export interface PatternsPayload extends ChangeVisionPayload {
  id: number;
  color: string;
}

export interface ChangePatternsPayload {
  pattern: PatternsPayload;
  delete?: boolean
}
