import { Pet } from '@prisma/client';

export interface Credentials {
  email: string;
  password: string;
}

type BreedType = 'cat' | 'dog' | 'sheep';

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
  value: number;
  name?: string;
  part?: string;
  id?: number;
  size: {
    width: number,
    height: number
  };
  position: {
    x: number,
    y: number
  }
}

type BodyPropType = PetConstructorProp & { breed: BreedType };
export interface PetConstructorState {
  body: BodyPropType;
  brows: PetConstructorProp;
  ears: PetConstructorProp;
  head: PetConstructorProp;
  tail: PetConstructorProp;
  whiskers: PetConstructorProp;
  patterns: PatternsPayload[];
  [key: string]: PetConstructorProp | PatternsPayload[];
}

type PartType = 'brows' | 'ears' | 'head' | 'tail' | 'whiskers';

export interface ChangeBodyPayload extends PetConstructorProp {
  breed: BreedType
}

export interface PartsData extends PetConstructorProp {
  name: string;
  part: PartType;
}

export type ChangeVisionPayload = PartsData;

export interface PatternsPayload extends PetConstructorProp {
  part: PartType;
  id: number;
  color: string;
}

export interface ChangePatternsPayload {
  pattern: PatternsPayload;
  delete?: boolean
}
export interface HistoryState {
  history: PartsData[];
}

