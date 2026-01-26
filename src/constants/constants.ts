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

export const RACE_CONTROLS_TITLE = 'Lights on. Engines ready. Who is the best?';

export const LIGHTS_COLUMNS = 5;

export const ACTIVE_CLASS = 'is-active';

export const ERROR_TEXT = {
  FAILED_TO_RENDER_PAGE: 'Failed to render page, please try again',
  CAR_NAME_AND_COLOR_REQUIRED: 'Name and color are required to create a car',
} as const;
