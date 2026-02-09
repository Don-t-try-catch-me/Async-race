import { ERROR_MSG } from '@/services/constants';

export class EngineError extends Error {
  constructor(message = ERROR_MSG.INTERNAL_SERVER_ERROR.ENGINE) {
    super(message);
    this.name = 'EngineError';
  }
}
