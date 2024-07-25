import { Pet } from '@prisma/client';
import type { ButtonHTMLAttributes } from 'react';
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

export type PartType = 'brows' | 'ears' | 'head' | 'tail' | 'whiskers' | 'body';

export interface PetConstructorProp {
  value: number;
  color?: string;
  name: string;
  part: PartType;
  id: number;
  size: {
    width: number,
    height: number
  };
  position: {
    x: number,
    y: number
  };
  patterns: Map<PatternsPayload['id'], PatternsPayload>;
}

export type BodyPropType = PetConstructorProp & { breed?: BreedType };
export interface PetConstructorState {
  body: BodyPropType;
  brows: PetConstructorProp;
  ears: PetConstructorProp;
  head: PetConstructorProp;
  tail: PetConstructorProp;
  whiskers: PetConstructorProp;
  [key: string]: PetConstructorProp;
}

export type ChangeBodyPayload = BodyPropType;

export type ChangeVisionPayload = PetConstructorProp & { part: Exclude<PartType, 'body'> };
export interface PatternsPayload extends Omit<PetConstructorProp, 'patterns' | 'name'> {
  partValue: number;
  color: string;
}

export interface ChangePatternsPayload {
  pattern: PatternsPayload;
}

export interface ChangePatternColorPayload {
  part: PartType;
  patternID: PatternsPayload['id'];
  color: PatternsPayload['color'];
}

export interface HistoryState {
  history: (PetConstructorProp | BodyPropType)[];
}

export interface ChangePartColorPayload {
  part: PartType;
  color: string;
}

export interface PatternButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: ChangePatternsPayload;
}
