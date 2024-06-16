import { ChangeVisionPayload } from "./types";

type BabyCatHeadEnumType = {
  [key: string]: ChangeVisionPayload;
};

export const BabyCatHeadEnum: BabyCatHeadEnumType = {
  '1': {
    part: 'head',
    value: 1,
    size: {
      width: 74,
      height: 28
    },
    position: {
      x: -56,
      y: -157
    }
  },
  '2': {
    part: 'head',
    value: 2,
    size: {
      width: 69,
      height: 39
    },
    position: {
      x: -50,
      y: -161
    }
  },
  '3': {
    part: 'head',
    value: 3,
    size: {
      width: 35,
      height: 33
    },
    position: {
      x: -55,
      y: -147
    }
  },
  '4': {
    part: 'head',
    value: 4,
    size: {
      width: 49,
      height: 47
    },
    position: {
      x: -60,
      y: -168
    }
  }
};
