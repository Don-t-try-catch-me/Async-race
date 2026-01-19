export const FOOTER_CONFIG = {
  links: [
    {
      label: 'Timofey Naryshkin',
      href: 'https://github.com/TimofeyNaryshkin',
    },
    {
      label: 'Natasha Solntseva',
      href: 'https://github.com/NatashaSolntseva',
    },
  ],
  year: '@ 2025',
} as const;

export const WINNER_TABLE_ROWS_PER_PAGE = 10;
export const CARS_LIST_ROWS_PER_PAGE = 7;

export const DEFAULT_COLOR: string = '#6c779f';

export const CARS_GENERATE_COUNT = 100;

export enum Route {
  Garage = '#/',
  Winners = '#/winners',
  Error = '#/error',
}
