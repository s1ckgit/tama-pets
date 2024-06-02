export interface ICredentials {
  email: string;
  password: string;
}

interface IPetCharacteristics {
  breed: string;
  color: string;
}

export interface IRegisterCredentials extends ICredentials, IPetCharacteristics {}
