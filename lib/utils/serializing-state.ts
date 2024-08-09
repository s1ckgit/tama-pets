/* eslint-disable @typescript-eslint/no-explicit-any */
interface SerializedMap {
  __type: 'Map',
  value: Array<[number, object]>
}

export const serializeReplacer = (key: string, value: { [key: string]: any }) => {
  const keys = Object.keys(value);

  for(const key of keys) {
    if(value[key] instanceof Map) {
      return {
        ...value,
        [key]: {
          __type: 'Map',
          value: Array.from(value[key].entries())
        }
      };
    }
  }

  return value;
};


export const deserializeReviver = (key: string, value: { [key: string]: SerializedMap | unknown }) => {
  const keys = Object.keys(value);

  for(const key of keys) {
    if(isSerializedMap(value[key])) {
      value[key] = new Map(value[key].value);
    }
  }

  return value;
};

function isSerializedMap(obj: any): obj is SerializedMap {
  return obj && obj.__type === 'Map' && Array.isArray(obj.value);
}
