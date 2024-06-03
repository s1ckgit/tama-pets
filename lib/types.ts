import { Pet } from '@prisma/client';

export interface Credentials {
  email: string;
  password: string;
}

interface PetCharacteristics {
  breed: string;
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
