import { PatternsPayload, type PetConstructorProp } from './types';

type PartsEnumType = PetConstructorProp[];

type PatternsEnumType = {
  [key: string]: PatternsPayload[]
};

export const BabyCatEarsEnum: PartsEnumType = [
  {
    id: 141113,
    part: "ears",
    name: "ears-2",
    color: '#ffffff',
    value: 2,
    size: {
      width: 191,
      height: 82
    },
    position: {
      x: 165,
      y: 228
    },
    patterns: new Map([])
  },
  {
    id: 19104,
    part: "ears",
    name: "ears-3",
    color: '#ffffff',
    value: 3,
    size: {
      width: 228,
      height: 78
    },
    position: {
      x: 149,
      y: 227
    },
    patterns: new Map([])
  },
  {
    id: 795623,
    part: "ears",
    name: "ears-1",
    color: '#ffffff',
    value: 1,
    size: {
      width: 160,
      height: 93
    },
    position: {
      x: 189,
      y: 233
    },
    patterns: new Map([])
  }
];

export const BabyCatTailsEnum: PartsEnumType = [
  {
    id: 883941,
    part: "tail",
    name: "tail-4",
    color: '#ffffff',
    value: 4,
    size: {
      width: 113,
      height: 138
    },
    position: {
      x: 385,
      y: 405
    },
    patterns: new Map([])
  },
  {
    id: 344573,
    part: "tail",
    name: "tail-3",
    color: '#ffffff',
    value: 3,
    size: {
      width: 56,
      height: 58
    },
    position: {
      x: 362,
      y: 440
    },
    patterns: new Map([])
  },
  {
    id: 713073,
    part: "tail",
    name: "tail-2",
    color: '#ffffff',
    value: 2,
    size: {
      width: 72,
      height: 87
    },
    position: {
      x: 374,
      y: 420
    },
    patterns: new Map([])
  },
  {
    id: 711425,
    part: "tail",
    name: "tail-1",
    color: '#ffffff',
    value: 1,
    size: {
      width: 146,
      height: 173
    },
    position: {
      x: 401,
      y: 400
    },
    patterns: new Map([])
  }
];

export const BabyCatWhiskersEnum: PartsEnumType = [
  {
    id: 289062,
    part: "whiskers",
    name: "whiskers-3",
    value: 3,
    size: {
      width: 230,
      height: 87
    },
    position: {
      x: 211,
      y: 264
    },
    patterns: new Map([])
  },
  {
    id: 995025,
    part: "whiskers",
    name: "whiskers-2",
    value: 2,
    size: {
      width: 302,
      height: 88
    },
    position: {
      x: 210,
      y: 254
    },
    patterns: new Map([])
  },
  {
    id: 74829,
    part: "whiskers",
    name: "whiskers-1",
    value: 1,
    size: {
      width: 272,
      height: 104
    },
    position: {
      x: 200,
      y: 260
    },
    patterns: new Map([])
  }
];

export const BabyCatBrowsEnum: PartsEnumType = [
  {
    id: 892425,
    part: "brows",
    name: "brows-3",
    color: '#ffffff',
    value: 3,
    size: {
      width: 57,
      height: 25
    },
    position: {
      x: 198,
      y: 264
    },
    patterns: new Map([])
  },
  {
    id: 327911,
    part: "brows",
    name: "brows-2",
    color: '#ffffff',
    value: 2,
    size: {
      width: 50,
      height: 28
    },
    position: {
      x: 199,
      y: 266
    },
    patterns: new Map([])
  },
  {
    id: 185852,
    part: "brows",
    name: "brows-1",
    color: '#ffffff',
    value: 1,
    size: {
      width: 61,
      height: 23
    },
    position: {
      x: 199,
      y: 271
    },
    patterns: new Map([])
  }
];

export const BabyCatHeadEnum: PartsEnumType = [
  {
    id: 112731,
    part: "head",
    name: "head-6",
    color: '#ffffff',
    value: 6,
    size: {
      width: 45,
      height: 38
    },
    position: {
      x: 179,
      y: 155
    },
    patterns: new Map([])
  },
  {
    id: 288879,
    part: "head",
    name: "head-5",
    color: '#ffffff',
    value: 5,
    size: {
      width: 45,
      height: 43
    },
    position: {
      x: 182,
      y: 153
    },
    patterns: new Map([])
  },
  {
    id: 453521,
    part: "head",
    name: "head-4",
    value: 4,
    size: {
      width: 48,
      height: 48
    },
    position: {
      x: 177,
      y: 151
    },
    patterns: new Map([])
  },
  {
    id: 874084,
    part: "head",
    name: "head-3",
    color: '#ffffff',
    value: 3,
    size: {
      width: 36,
      height: 35
    },
    position: {
      x: 184,
      y: 174
    },
    patterns: new Map([])
  },
  {
    id: 387939,
    part: "head",
    name: "head-2",
    color: '#ffffff',
    value: 2,
    size: {
      width: 70,
      height: 41
    },
    position: {
      x: 190,
      y: 160
    },
    patterns: new Map([])
  },
  {
    id: 462463,
    part: "head",
    name: "head-1",
    value: 1,
    size: {
      width: 75,
      height: 29
    },
    position: {
      x: 184,
      y: 163
    },
    patterns: new Map([])
  }
];

export const BabyCatPatternsEnum: PatternsEnumType = {
  'body-1': [
    {
      id: 446380,
      part: "body",
      partValue: 1,
      value: 1,
      size: {
        width: 51,
        height: 50
      },
      position: {
        x: 30,
        y: 179
      },
      color: "#C95064"
    },
    {
      id: 479766,
      part: "body",
      partValue: 1,
      value: 2,
      size: {
        width: 57,
        height: 42
      },
      position: {
        x: 29,
        y: 243
      },
      color: "#D8B73E"
    },
    {
      id: 368041,
      part: "body",
      partValue: 1,
      value: 3,
      size: {
        width: 109,
        height: 108
      },
      position: {
        x: 59,
        y: 208
      },
      color: "#BA2894"
    },
    {
      id: 786102,
      part: "body",
      partValue: 1,
      value: 4,
      size: {
        width: 132,
        height: 163
      },
      position: {
        x: 71,
        y: 236
      },
      color: "#549998"
    },
    {
      id: 300567,
      part: "body",
      partValue: 1,
      value: 5,
      size: {
        width: 71,
        height: 119
      },
      position: {
        x: 202,
        y: 268
      },
      color: "#BB19DC"
    },
    {
      id: 836578,
      part: "body",
      partValue: 1,
      value: 6,
      size: {
        width: 176,
        height: 125
      },
      position: {
        x: 150,
        y: 266
      },
      color: "#FDC18F"
    },
    {
      id: 711486,
      part: "body",
      partValue: 1,
      value: 7,
      size: {
        width: 112,
        height: 113
      },
      position: {
        x: 56,
        y: 211
      },
      color: "#BD96BE"
    },
    {
      id: 660980,
      part: "body",
      partValue: 1,
      value: 8,
      size: {
        width: 44,
        height: 35
      },
      position: {
        x: 216,
        y: 232
      },
      color: "#EC7CD3"
    },
    {
      id: 320983,
      part: "body",
      partValue: 1,
      value: 9,
      size: {
        width: 156,
        height: 167
      },
      position: {
        x: 158,
        y: 231
      },
      color: "#E45B12"
    },
    {
      id: 992889,
      part: "body",
      partValue: 1,
      value: 10,
      size: {
        width: 45,
        height: 109
      },
      position: {
        x: 183,
        y: 205
      },
      color: "#60A076"
    },
    {
      id: 268554,
      part: "body",
      partValue: 1,
      value: 11,
      size: {
        width: 57,
        height: 56
      },
      position: {
        x: 133,
        y: 271
      },
      color: "#CAD7B0"
    },
    {
      id: 82489,
      part: "body",
      partValue: 1,
      value: 12,
      size: {
        width: 27,
        height: 64
      },
      position: {
        x: 222,
        y: 240
      },
      color: "#743296"
    },
    {
      id: 360900,
      part: "body",
      partValue: 1,
      value: 13,
      size: {
        width: 146,
        height: 192
      },
      position: {
        x: 164,
        y: 232
      },
      color: "#5F44F0"
    },
    {
      id: 440795,
      part: "body",
      partValue: 1,
      value: 14,
      size: {
        width: 128,
        height: 167
      },
      position: {
        x: 172,
        y: 242
      },
      color: "#7BC006"
    }
  ],
  'ears-2': [
    {
      id: 412750,
      part: "ears",
      partValue: 2,
      value: 1,
      size: {
        width: 132,
        height: 27
      },
      position: {
        x: 59,
        y: 29
      },
      color: "#43D4F9"
    },
    {
      id: 384368,
      part: "ears",
      partValue: 2,
      value: 2,
      size: {
        width: 138,
        height: 43
      },
      position: {
        x: 69,
        y: 39
      },
      color: "#2F6977"
    },
    {
      id: 896301,
      part: "ears",
      partValue: 2,
      value: 3,
      size: {
        width: 158,
        height: 58
      },
      position: {
        x: 79,
        y: 42
      },
      color: "#A055F0"
    }
  ],
  'ears-3': [
    {
      id: 682006,
      part: "ears",
      partValue: 3,
      value: 1,
      size: {
        width: 119,
        height: 12
      },
      position: {
        x: 53,
        y: 12
      },
      color: "#C4A4DF"
    },
    {
      id: 385559,
      part: "ears",
      partValue: 3,
      value: 2,
      size: {
        width: 153,
        height: 40
      },
      position: {
        x: 76,
        y: 28
      },
      color: "#E6A187"
    },
    {
      id: 613006,
      part: "ears",
      partValue: 3,
      value: 3,
      size: {
        width: 174,
        height: 53
      },
      position: {
        x: 87,
        y: 33
      },
      color: "#9DA224"
    }
  ],
  'ears-1': [
    {
      id: 491180,
      part: "ears",
      partValue: 1,
      value: 1,
      size: {
        width: 115,
        height: 45
      },
      position: {
        x: 52,
        y: 77
      },
      color: "#6F5622"
    },
    {
      id: 488189,
      part: "ears",
      partValue: 1,
      value: 2,
      size: {
        width: 128,
        height: 65
      },
      position: {
        x: 64,
        y: 61
      },
      color: "#DF7720"
    },
    {
      id: 168273,
      part: "ears",
      partValue: 1,
      value: 3,
      size: {
        width: 152,
        height: 87
      },
      position: {
        x: 76,
        y: 50
      },
      color: "#9CF366"
    }
  ],
  'tail-1': [
    {
      id: 32989,
      part: "tail",
      partValue: 1,
      value: 1,
      size: {
        width: 72,
        height: 38
      },
      position: {
        x: 109,
        y: 19
      },
      color: "#F118C2"
    },
    {
      id: 107208,
      part: "tail",
      partValue: 1,
      value: 2,
      size: {
        width: 102,
        height: 117
      },
      position: {
        x: 94,
        y: 58
      },
      color: "#5600D6"
    },
    {
      id: 872009,
      part: "tail",
      partValue: 1,
      value: 3,
      size: {
        width: 73,
        height: 84
      },
      position: {
        x: 83,
        y: 97
      },
      color: "#176AF8"
    },
    {
      id: 234436,
      part: "tail",
      partValue: 1,
      value: 4,
      size: {
        width: 110,
        height: 162
      },
      position: {
        x: 76,
        y: 85
      },
      color: "#0A0F9D"
    },
    {
      id: 832763,
      part: "tail",
      partValue: 1,
      value: 5,
      size: {
        width: 147,
        height: 166
      },
      position: {
        x: 72,
        y: 83
      },
      color: "#EB212C"
    },
    {
      id: 41687,
      part: "tail",
      partValue: 1,
      value: 6,
      size: {
        width: 114,
        height: 162
      },
      position: {
        x: 71,
        y: 85
      },
      color: "#E68D0F"
    },
    {
      id: 917602,
      part: "tail",
      partValue: 1,
      value: 7,
      size: {
        width: 84,
        height: 107
      },
      position: {
        x: 104,
        y: 54
      },
      color: "#B74518"
    }
  ],
  'tail-2': [
    {
      id: 987670,
      part: "tail",
      partValue: 2,
      value: 1,
      size: {
        width: 54,
        height: 64
      },
      position: {
        x: 45,
        y: 55
      },
      color: "#9647F7"
    },
    {
      id: 564483,
      part: "tail",
      partValue: 2,
      value: 2,
      size: {
        width: 27,
        height: 70
      },
      position: {
        x: 58,
        y: 35
      },
      color: "#18A9C7"
    },
    {
      id: 629974,
      part: "tail",
      partValue: 2,
      value: 3,
      size: {
        width: 69,
        height: 76
      },
      position: {
        x: 37,
        y: 49
      },
      color: "#9AEFA6"
    },
    {
      id: 543518,
      part: "tail",
      partValue: 2,
      value: 4,
      size: {
        width: 65,
        height: 72
      },
      position: {
        x: 39,
        y: 50
      },
      color: "#3CFD3A"
    },
    {
      id: 542083,
      part: "tail",
      partValue: 2,
      value: 5,
      size: {
        width: 58,
        height: 80
      },
      position: {
        x: 42,
        y: 40
      },
      color: "#F04B6E"
    }
  ],
  'tail-3': [
    {
      id: 809631,
      part: "tail",
      partValue: 3,
      value: 1,
      size: {
        width: 44,
        height: 48
      },
      position: {
        x: 25,
        y: 34
      },
      color: "#D1EED0"
    },
    {
      id: 435424,
      part: "tail",
      partValue: 3,
      value: 2,
      size: {
        width: 49,
        height: 58
      },
      position: {
        x: 31,
        y: 29
      },
      color: "#F66B0D"
    },
    {
      id: 532806,
      part: "tail",
      partValue: 3,
      value: 3,
      size: {
        width: 54,
        height: 46
      },
      position: {
        x: 28,
        y: 29
      },
      color: "#35914A"
    },
    {
      id: 690521,
      part: "tail",
      partValue: 3,
      value: 4,
      size: {
        width: 35,
        height: 51
      },
      position: {
        x: 38,
        y: 26
      },
      color: "#D8BD87"
    }
  ],
  'tail-4': [
    {
      id: 53405,
      part: "tail",
      partValue: 4,
      value: 1,
      size: {
        width: 39,
        height: 58
      },
      position: {
        x: 94,
        y: 29
      },
      color: '#000000'
    },
    {
      id: 992126,
      part: "tail",
      partValue: 4,
      value: 2,
      size: {
        width: 51,
        height: 28
      },
      position: {
        x: 67,
        y: 124
      },
      color: '#000000'
    },
    {
      id: 152404,
      part: "tail",
      partValue: 4,
      value: 3,
      size: {
        width: 100,
        height: 137
      },
      position: {
        x: 60,
        y: 70
      },
      color: '#000000'
    },
    {
      id: 698791,
      part: "tail",
      partValue: 4,
      value: 4,
      size: {
        width: 97,
        height: 124
      },
      position: {
        x: 54,
        y: 75
      },
      color: '#000000'
    },
    {
      id: 608245,
      part: "tail",
      partValue: 4,
      value: 5,
      size: {
        width: 98,
        height: 122
      },
      position: {
        x: 60,
        y: 77
      },
      color: '#000000'
    },
    {
      id: 842742,
      part: "tail",
      partValue: 4,
      value: 6,
      size: {
        width: 95,
        height: 138
      },
      position: {
        x: 65,
        y: 69
      },
      color: '#000000'
    }
  ]
};
