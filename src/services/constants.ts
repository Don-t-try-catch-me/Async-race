export const BASE_URL = 'http://127.0.0.1:3000';

export const ENDPOINTS = {
  GARAGE: '/garage',
  WINNERS: '/winners',
  ENGINE: '/engine',
} as const;

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MSG = {
  BAD_REQUEST:
    'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive".',
  NOT_FOUND: {
    CAR: 'No car with this parameters yet.',
    ENGINE:
      'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?',
    WINNER: 'No winner with this id yet.',
  },
  TOO_MANY_REQUESTS:
    "Drive already in progress. You can't run drive for the same car twice while it's not stopped.",
  INTERNAL_SERVER_ERROR: {
    ENGINE: "Car has been stopped suddenly. It's engine was broken down.",
    WINNER: 'Insert failed, duplicate id.',
  },
} as const;
