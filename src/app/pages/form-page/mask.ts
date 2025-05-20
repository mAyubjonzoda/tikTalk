import type { MaskitoOptions } from '@maskito/core';

export default {
  mask: [
    '+',
    '9',
    '9',
    '2',
    ' ',
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
} satisfies MaskitoOptions;
